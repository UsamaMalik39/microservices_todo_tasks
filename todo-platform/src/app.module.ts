import { Module } from '@nestjs/common';
import { APIServiceModule } from './api/api.service.module';
import { DatabaseSchemaModule } from './mongo/database.schema.module';
import { ScheduleTasksModule } from './schedule-tasks/schedule-tasks.module';

@Module({
  controllers: [],
  providers: [],
  imports: [DatabaseSchemaModule, APIServiceModule, ScheduleTasksModule],
})
export class AppModule {}
