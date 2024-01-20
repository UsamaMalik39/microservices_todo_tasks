import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';
import { CRON_TIME, ENABLE_CRON } from 'src/common/config/app.config';
import { IUser } from 'src/repositories/model/user';
import { TodoRepository } from 'src/repositories/todo.repository';

@Injectable()
export class ScheduleTasksService {
  private readonly logger = new Logger(ScheduleTasksService.name);
  constructor(    private readonly todoRepository: TodoRepository    ) {}

  @Cron(CRON_TIME)
  async dueDateCrossedCron() {
    if (!Boolean(ENABLE_CRON)) {
      this.logger.verbose(
        'The task cron is disabled....',
      );
      return;
    }

    this.logger.verbose('The task cron has started....');
    const dbRecord = await this.todoRepository.findDoneTasksOverMonth();
    for(const task of dbRecord){
      console.log('tasks',task)
      // await this.todoRepository.deleteTaskCron(task);
    }
    this.logger.verbose('The task cron was completed....');
  }
}
