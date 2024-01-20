import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { LOGGER_SERVICE, LOGGER_SERVICE_KEY, TODO_SERVICE,
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
import { LoggerService } from './logger/logger.service';
import { LoggerController } from './logger/logger.controller';

@Module({
  controllers: [
    UserController,
    TodoController,
    LoggerController
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
    {
      provide: LOGGER_SERVICE,
      useFactory: (discoveryService: DiscoveryService) => {
        const loggerServiceOptions = discoveryService.get(LOGGER_SERVICE_KEY);
        return ClientProxyFactory.create(loggerServiceOptions);
      },
      inject: [DiscoveryService],
    },
    AuthGuard,
    UserService,
    TodoService,
    LoggerService
  ],
})
export class ApiModule {}
