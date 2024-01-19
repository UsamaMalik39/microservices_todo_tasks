import { Module } from '@nestjs/common';
import { ClientProxyFactory } from '@nestjs/microservices';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import {
  MAIL_SERVICE,
  MAIL_SERVICE_KEY,
  USER_SERVICE,
  USER_SERVICE_KEY,
} from 'src/common/config/constant';
import { DiscoveryService } from 'src/common/service.discovery';
import {
  TaskNotification,
  TaskNotificationSchema,
} from 'src/mongo/schemas/task_notification.schema';
import { TaskNotificationRepository } from 'src/repositories/task.notification.repository';
import { ScheduleTasksService } from './tasks/tasks.service';

@Module({
  imports: [
    ScheduleModule.forRoot(),
    MongooseModule.forFeature([
      { name: TaskNotification.name, schema: TaskNotificationSchema },
    ]),
  ],
  providers: [
    DiscoveryService,
    {
      provide: MAIL_SERVICE,
      useFactory: (discoveryService: DiscoveryService) => {
        const mailServiceOptions = discoveryService.get(MAIL_SERVICE_KEY);
        return ClientProxyFactory.create(mailServiceOptions);
      },
      inject: [DiscoveryService],
    },
    {
      provide: USER_SERVICE,
      useFactory: (discoveryService: DiscoveryService) => {
        const userServiceOptions = discoveryService.get(USER_SERVICE_KEY);
        return ClientProxyFactory.create(userServiceOptions);
      },
      inject: [DiscoveryService],
    },
    TaskNotificationRepository,
    ScheduleTasksService,
  ],
})
export class ScheduleTasksModule {}
