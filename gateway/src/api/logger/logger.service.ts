import { Injectable, Logger, Inject, Scope } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { ClientProxy } from '@nestjs/microservices';
import { LOGGED_IN_USER, LOGGER_SERVICE, TODO_SERVICE } from '../../common/config/constant';
import { TodoDto, TodoRequestDto } from '../dto/todo.dto';

@Injectable({ scope: Scope.REQUEST })
export class LoggerService {
  private readonly logger = new Logger(LoggerService.name);
  constructor(
    @Inject(REQUEST) private readonly request: Request,
    @Inject(LOGGER_SERVICE) private readonly loggerServiceClient: ClientProxy,
  ) {}


  public async get() {
    const pattern = { cmd: 'get_logs' };
    const response = await this.loggerServiceClient
      .send(pattern, {
        loggedInUser: this.request[LOGGED_IN_USER],
      })
      .toPromise();
    return response;
  }





}
