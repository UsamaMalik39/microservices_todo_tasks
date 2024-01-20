import { Injectable, Logger, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { LOGGED_IN_USER, LOGGER_SERVICE, TODO_SERVICE } from '../../common/config/constant';
import { TodoDto, TodoRequestDto } from '../dto/todo.dto';

@Injectable({ scope: Scope.REQUEST })
export class TodoService {
  private readonly logger = new Logger(TodoService.name);
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @Inject(TODO_SERVICE) private readonly todoServiceClient: ClientProxy,
    @Inject(LOGGER_SERVICE) private readonly loggerServiceClient: ClientProxy,
  ) {}

  public async getAll(): Promise<TodoDto[]> {
    const pattern = { cmd: 'get_all_todo' };
    const response: TodoDto[] = await this.todoServiceClient
      .send(pattern, {})
      .toPromise();
    return response;
  }

  public async get(id: string): Promise<TodoDto> {
    const pattern = { cmd: 'get_todo' };
    const response: TodoDto = await this.todoServiceClient
      .send(pattern, {
        id,
        loggedInUser: this.request[LOGGED_IN_USER],
      })
      .toPromise();
    return response;
  }

  public async create(todo: TodoRequestDto): Promise<TodoDto> {
    const pattern = { cmd: 'create_todo' };
    const response: TodoDto = await this.todoServiceClient
      .send(pattern, {
        todo,
        loggedInUser: this.request[LOGGED_IN_USER],
      })
      .toPromise();
    await this.loggerServiceClient
    .send({cmd: 'create_logs'}, {
      log: {title: `Created a todo with title: ${todo.title}`}
    })
    .toPromise();
    return response;
  }

  public async update(id: string, todo: TodoRequestDto): Promise<TodoDto> {
    const pattern = { cmd: 'update_todo' };
    const response: TodoDto = await this.todoServiceClient
      .send(pattern, {
        id,
        todo,
        loggedInUser: this.request[LOGGED_IN_USER],
      })
      .toPromise();
    await this.loggerServiceClient
    .send({cmd: 'create_logs'}, {
      log: {title: `updated a todo with title: ${todo.title}`}
    })
    .toPromise();
    return response;
  }



  public async delete(id: string): Promise<TodoDto> {
    const pattern = { cmd: 'delete_todo' };
    const response: TodoDto = await this.todoServiceClient
      .send(pattern, {
        id,
        loggedInUser: this.request[LOGGED_IN_USER],
      })
      .toPromise();
    await this.loggerServiceClient
    .send({cmd: 'create_logs'}, {
      log: {title: `updated a todo with id: ${id}`}
    })
    .toPromise();
    return response;
  }
}
