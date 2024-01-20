import { Module } from '@nestjs/common';
import { LoggerModule } from './api/logger.module';

@Module({
  imports: [LoggerModule],
})
export class AppModule {}
