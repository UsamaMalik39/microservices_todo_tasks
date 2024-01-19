import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Todo, TodoSchema } from 'src/mongo/schemas/todo.schema';
import { User, UserSchema } from 'src/mongo/schemas/user.schema';
import { TodoService } from './todo/todo.service';
import { TodoController } from './todo/todo.controller';
import { TodoRepository } from 'src/repositories/todo.repository';
import { DiscoveryService } from 'src/common/service.discovery';
import { ClientProxyFactory } from '@nestjs/microservices';
import { USER_SERVICE, USER_SERVICE_KEY } from 'src/common/config/constant';
import { PermissionGuard } from 'src/common/permission.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Todo.name, schema: TodoSchema },
    ]),
  ],
  controllers: [TodoController],
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
    TodoRepository,
  ],
})
export class APIServiceModule {}
