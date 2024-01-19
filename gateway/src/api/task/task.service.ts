import { Injectable, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { LOGGED_IN_USER, TODO_SERVICE } from '../../common/config/constant';
import { TaskRequestDto, TaskResponseDto } from '../dto/task.dto';

@Injectable({ scope: Scope.REQUEST })
export class TaskService {
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @Inject(TODO_SERVICE) private readonly todoServiceClient: ClientProxy,
  ) {}

  public async create(
    todoId: string,
    task: TaskRequestDto,
  ): Promise<TaskResponseDto> {
    const request = {
      title: task.title,
      description: task.description,
      startDate: new Date(task.startDate).getMilliseconds(),
      dueDate: new Date(task.dueDate).getMilliseconds(),
    };
    const pattern = { cmd: 'create_task' };
    const response: TaskResponseDto = await this.todoServiceClient
      .send(pattern, {
        todoId,
        request,
        loggedInUser: this.request[LOGGED_IN_USER],
      })
      .toPromise();
    return response;
  }

  public async update(
    todoId: string,
    id: string,
    task: TaskRequestDto,
  ): Promise<TaskResponseDto> {
    const pattern = { cmd: 'update_task' };
    const response: TaskResponseDto = await this.todoServiceClient
      .send(pattern, {
        todoId,
        id,
        task,
        loggedInUser: this.request[LOGGED_IN_USER],
      })
      .toPromise();
    return response;
  }

  public async getByTodo(todoId: string): Promise<TaskResponseDto[]> {
    const pattern = { cmd: 'get_task_by_todo' };
    const response: TaskResponseDto[] = await this.todoServiceClient
      .send(pattern, {
        todoId,
        loggedInUser: this.request[LOGGED_IN_USER],
      })
      .toPromise();
    return response;
  }

  public async get(todoId: string, id: string): Promise<TaskResponseDto> {
    const pattern = { cmd: 'get_task' };
    const response: TaskResponseDto = await this.todoServiceClient
      .send(pattern, {
        todoId,
        id,
        loggedInUser: this.request[LOGGED_IN_USER],
      })
      .toPromise();
    return response;
  }

  public async delete(todoId: string, id: string): Promise<TaskResponseDto> {
    const pattern = { cmd: 'delete_task' };
    const response: TaskResponseDto = await this.todoServiceClient
      .send(pattern, {
        todoId,
        id,
        loggedInUser: this.request[LOGGED_IN_USER],
      })
      .toPromise();
    return response;
  }
}
