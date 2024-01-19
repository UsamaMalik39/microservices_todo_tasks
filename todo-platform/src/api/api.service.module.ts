import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from 'src/mongo/schemas/todo.schema';
import { User, UserSchema } from 'src/mongo/schemas/user.schema';
import { TodoService } from './todo/todo.service';
import { TaskController } from './task/task.controller';
import { Task, TaskSchema } from 'src/mongo/schemas/task.schema';
import {
  TaskHistory,
  TaskHistorySchema,
} from 'src/mongo/schemas/task_history.schema';
import { TaskRepository } from 'src/repositories/task.repository';
import { TodoController } from './todo/todo.controller';
import { TaskActivityController } from './task-activities/task.activity.controller';
import { TaskService } from './task/task.service';
import { TaskActivityRepository } from 'src/repositories/task.activity.repository';
import { TodoRepository } from 'src/repositories/todo.repository';
import { TaskActivityService } from './task-activities/task.activity.service';
import { DiscoveryService } from 'src/common/service.discovery';
import { ClientProxyFactory } from '@nestjs/microservices';
import { USER_SERVICE, USER_SERVICE_KEY } from 'src/common/config/constant';
import { PermissionGuard } from 'src/common/permission.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Todo.name, schema: TodoSchema },
      { name: Task.name, schema: TaskSchema },
      { name: TaskHistory.name, schema: TaskHistorySchema },
    ]),
  ],
  controllers: [TodoController, TaskController, TaskActivityController],
  providers: [
    DiscoveryService,
    {
      provide: USER_SERVICE,
      useFactory: (discoveryService: DiscoveryService) => {
        const userServiceOptions = discoveryService.get(USER_SERVICE_KEY);
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [DiscoveryService],
    },
    PermissionGuard,
    TodoService,
    TaskService,
    TodoRepository,
    TaskRepository,
    TaskActivityService,
    TaskActivityRepository,
  ],
})
export class APIServiceModule {}
