import { Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CoOwnersRequestDto } from 'src/api/dto/coowers.dto';
import { TodoDto, TodoRequestDto } from 'src/api/dto/todo.dto';
import { UserDto } from 'src/api/dto/user.dto';
import { USER_SERVICE } from 'src/common/config/constant';
import { PermissionGuard } from 'src/common/permission.guard';
import { IUser } from 'src/repositories/model/user';
import { TodoRepository } from 'src/repositories/todo.repository';

@Injectable()
export class TodoService {
  private readonly logger = new Logger(TodoService.name);
  constructor(
    @Inject(USER_SERVICE) private readonly userServiceClient: ClientProxy,
    private readonly todoRepository: TodoRepository,
    private readonly permissionGuard: PermissionGuard,
  ) {}

  public async getAll(): Promise<TodoDto[]> {
    return await this.todoRepository.findAll();
  }

  public async get(id: string, loggedInUser: UserDto): Promise<TodoDto> {
    this.logger.verbose(`Request to get todo based on id received ...`);
    const dbRecord = await this.todoRepository.findOne(id);
    this.permissionGuard.hasPermission(dbRecord, loggedInUser);
    this.permissionGuard.isTodoActive(dbRecord);
    return dbRecord;
  }

  public async create(
    request: TodoRequestDto,
    loggedInUser: UserDto,
  ): Promise<TodoDto> {
    const todo: TodoDto = {
      ...request,
      active: true,
    };
    return await this.todoRepository.create(todo, loggedInUser);
  }

  public async update(
    id: string,
    request: TodoRequestDto,
    loggedInUser: UserDto,
  ): Promise<TodoDto> {
    const dbRecord = await this.todoRepository.findOne(id);
    this.permissionGuard.hasPermission(dbRecord, loggedInUser);
    this.permissionGuard.isTodoActive(dbRecord);
    const todo: TodoDto = {
      ...request,
      active: dbRecord.active,
    };
    return await this.todoRepository.update(id, todo, loggedInUser);
  }

  public async addCoOwners(
    id: string,
    coowners: CoOwnersRequestDto,
    loggedInUser: UserDto,
  ): Promise<TodoDto> {
    const dbRecord = await this.todoRepository.findOne(id);
    this.permissionGuard.hasOwnerPermission(dbRecord, loggedInUser);
    this.permissionGuard.isTodoActive(dbRecord);
    const pattern = { cmd: 'user_details' };
    try {
      for (const email of coowners.emails) {
        const response: IUser = await this.userServiceClient
          .send(pattern, {
            email,
          })
          .toPromise();
        dbRecord.coowner.push(response);
      }
      return this.todoRepository.update(id, dbRecord, loggedInUser);
    } catch (e) {
      throw e;
    }
  }

  public async delete(id: string, loggedInUser: UserDto): Promise<TodoDto> {
    const dbRecord = await this.todoRepository.findOne(id);
    this.permissionGuard.hasOwnerPermission(dbRecord, loggedInUser);
    this.permissionGuard.isTodoActive(dbRecord);
    return await this.todoRepository.delete(id, loggedInUser);
  }
}
