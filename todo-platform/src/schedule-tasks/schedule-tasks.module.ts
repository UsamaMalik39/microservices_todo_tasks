import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import {
  USER_SERVICE,
  USER_SERVICE_KEY,
} from 'src/common/config/constant';
import { DiscoveryService } from 'src/common/service.discovery';
import { ScheduleTasksService } from './tasks/tasks.service';
import { TodoRepository } from 'src/repositories/todo.repository';
import { Todo, TodoSchema } from 'src/mongo/schemas/todo.schema';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: Todo.name, schema: TodoSchema },
    ]),
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
    ScheduleTasksService,
    TodoRepository
  ],
})
export class ScheduleTasksModule {}
