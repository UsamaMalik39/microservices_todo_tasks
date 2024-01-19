import { TodoRequestDto } from 'src/api/dto/todo.dto';
import { TodoService } from './todo.service';
import { UserDto } from 'src/api/dto/user.dto';
import { MessagePattern } from '@nestjs/microservices';
import { Controller, Logger } from '@nestjs/common';

@Controller()
export class TodoController {
  private readonly logger = new Logger(TodoController.name);

  constructor(private service: TodoService) {}

  @MessagePattern({ cmd: 'get_all_todo' })
  async getAll() {
    return await this.service.getAll();
  }

  @MessagePattern({ cmd: 'get_todo' })
  async get(data: { id: string; loggedInUser: UserDto }) {
    this.logger.verbose('Request for get todo by id reveiced ...');
    return await this.service.get(data.id, data.loggedInUser);
  }

  @MessagePattern({ cmd: 'create_todo' })
  async create(data: { todo: TodoRequestDto; loggedInUser: UserDto }) {
    return await this.service.create(data.todo, data.loggedInUser);
  }

  @MessagePattern({ cmd: 'update_todo' })
  async update(data: {
    id: string;
    todo: TodoRequestDto;
    loggedInUser: UserDto;
  }) {
    return await this.service.update(data.id, data.todo, data.loggedInUser);
  }


  @MessagePattern({ cmd: 'delete_todo' })
  async delete(data: { id: string; loggedInUser: UserDto }) {
    return await this.service.delete(data.id, data.loggedInUser);
  }
}
