import { Module } from '@nestjs/common';
import { NotifyModule } from './api/notify.module';

@Module({
  imports: [NotifyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
