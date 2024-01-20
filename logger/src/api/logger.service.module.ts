import { Module } from '@nestjs/common';
import { LogsController } from './logs/logs.controller';
import { LogsService } from './logs/logs.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from 'src/mongo/schema/user.schema';
import { LogsRepository } from 'src/repositories/logs.repository';
import { Logs, LogsSchema } from 'src/mongo/schema/logs.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: Logs.name, schema: LogsSchema },
    ]),
  ],
  providers: [LogsService,LogsRepository],
  controllers: [LogsController],
})
export class LoggerModule {}
