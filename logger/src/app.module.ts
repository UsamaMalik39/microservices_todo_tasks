import { Module } from '@nestjs/common';
import { LoggerModule } from './api/logger.service.module';
import { DatabaseSchemaModule } from './mongo/database.schema.module';

@Module({
  imports: [LoggerModule,DatabaseSchemaModule],
})
export class AppModule {}
