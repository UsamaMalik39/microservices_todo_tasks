import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { TODO_SERVICE,
  TODO_SERVICE_KEY,
  USER_SERVICE,
  USER_SERVICE_KEY,
} from '../common/config/constant';
import { DiscoveryService } from '../common/service.discovery';
import { AuthGuard } from './guards/auth.guard';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { TaskController } from './task/task.controller';
import { TaskService } from './task/task.service';
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';
import { TaskActivityService } from './task-activity/task-activity.service';
import { TaskActivityController } from './task-activity/task-activity.controller';

@Module({
  controllers: [
    UserController,
    TaskController,
    TodoController,
    TaskActivityController,
  ],
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
    {
      provide: TODO_SERVICE,
      useFactory: (discoveryService: DiscoveryService) => {
        const userServiceOptions = discoveryService.get(TODO_SERVICE_KEY);
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [DiscoveryService],
    },
    AuthGuard,
    UserService,
    TaskService,
    TodoService,
    TaskActivityService,
  ],
})
export class ApiModule {}
