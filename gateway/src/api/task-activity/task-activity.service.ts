import { Injectable, Scope, Inject, Logger } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { LOGGED_IN_USER, TODO_SERVICE } from '../../common/config/constant';
import { TaskHistoryDto } from '../dto/task.history.dto';

@Injectable({ scope: Scope.REQUEST })
export class TaskActivityService {
  private readonly logger = new Logger(TaskActivityService.name);
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @Inject(TODO_SERVICE) private readonly todoServiceClient: ClientProxy,
  ) {}

  public async getByTask(taskId: string): Promise<TaskHistoryDto[]> {
    this.logger.verbose('Request send to get task history...');
    const pattern = { cmd: 'task_history' };
    const response: TaskHistoryDto[] = await this.todoServiceClient
      .send(pattern, {
        taskId,
      })
      .toPromise();
    return response;
  }

  public async start(taskId: string): Promise<TaskHistoryDto> {
    this.logger.verbose('Request sent to start task ...');
    const pattern = { cmd: 'start_task' };
    const response: TaskHistoryDto = await this.todoServiceClient
      .send(pattern, {
        taskId,
        loggedInUser: this.request[LOGGED_IN_USER],
      })
      .toPromise();
    return response;
  }

  public async end(taskId: string, id: string): Promise<TaskHistoryDto> {
    const pattern = { cmd: 'end_task' };
    const response: TaskHistoryDto = await this.todoServiceClient
      .send(pattern, {
        taskId,
        id,
        loggedInUser: this.request[LOGGED_IN_USER],
      })
      .toPromise();
    return response;
  }
}
