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
import { TodoController } from './todo/todo.controller';
import { TodoService } from './todo/todo.service';

@Module({
  controllers: [
    UserController,
    TodoController,
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
    TodoService,
  ],
})
export class ApiModule {}
