import {
  BadRequestException,
  Inject,
  Injectable,
  Scope,
  UnauthorizedException,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { IUser } from 'src/repositories/model/user';
import { TaskDocument } from 'src/mongo/schemas/task.schema';
import { TodoDocument } from 'src/mongo/schemas/todo.schema';

@Injectable({ scope: Scope.REQUEST })
export class PermissionGuard {
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  public hasPermission(todo: TodoDocument, loggedInUser: IUser) {
    if (
      todo.owner == loggedInUser['_id'] ||
      todo.coowner.find(loggedInUser['_id'])
    ) {
      return;
    }
    throw new UnauthorizedException();
  }

  public hasOwnerPermission(todo: TodoDocument, loggedInUser: IUser) {
    if (todo.owner == loggedInUser['_id']) {
      return;
    }
    throw new UnauthorizedException();
  }

  public isTodoActive(dbRecord: TodoDocument) {
    if (!dbRecord.active) {
      throw new BadRequestException('The todolist is been deleted');
    }
  }

  public isTaskActive(dbRecord: TaskDocument) {
    if (!dbRecord.active) {
      throw new BadRequestException('The task is been deleted');
    }
  }
}
