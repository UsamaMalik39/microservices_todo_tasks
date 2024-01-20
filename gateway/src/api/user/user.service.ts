import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { LOGGER_SERVICE, USER_SERVICE } from '../../common/config/constant';
import { LoginRequestDto, LoginResponseDto } from '../dto/login.dto';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject(USER_SERVICE) private readonly userServiceClient: ClientProxy,
    @Inject(LOGGER_SERVICE) private readonly loggerServiceClient: ClientProxy,
  ) {}

  public async getAll(): Promise<UserDto[]> {
    const pattern = { cmd: 'get_all' };
    const response: UserDto[] = await this.userServiceClient
      .send(pattern, {})
      .toPromise();
    return response;
  }

  public async get(id: string): Promise<UserDto> {
    const pattern = { cmd: 'get_user_by_id' };
    const response: UserDto = await this.userServiceClient
      .send(pattern, {
        id,
      })
      .toPromise();
    return response;
  }

  public async create(model: UserDto): Promise<UserDto> {
    const pattern = { cmd: 'create_user' };
    const response: UserDto = await this.userServiceClient
      .send(pattern, {
        model,
      })
      .toPromise();
    return response;
  }

  public async update(id: string, model: UserDto): Promise<UserDto> {
    const pattern = { cmd: 'udpate_user' };
    const response: UserDto = await this.userServiceClient
      .send(pattern, {
        id,
        model,
      })
      .toPromise();
    return response;
  }

  public async delete(id: string): Promise<UserDto> {
    const pattern = { cmd: 'delete_user' };
    const response: UserDto = await this.userServiceClient
      .send(pattern, {
        id,
      })
      .toPromise();
    return response;
  }

  public async login(model: LoginRequestDto): Promise<LoginResponseDto> {
    const pattern = { cmd: 'login' };
    const response: LoginResponseDto = await this.userServiceClient
      .send(pattern, {
        model,
      })
      .toPromise();
    const logResponse = await this.loggerServiceClient
    .send({cmd: 'create_logs'}, {
      log: {title: `logged in via email: ${model.email}`}
    })
    .toPromise();
    return response;
  }
}
