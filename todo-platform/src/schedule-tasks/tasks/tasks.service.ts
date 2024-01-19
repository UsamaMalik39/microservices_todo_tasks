import { HttpStatus, Inject, Injectable, Logger } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Cron } from '@nestjs/schedule';
import { CRON_TIME, ENABLE_CRON } from 'src/common/config/app.config';
import { IUser } from 'src/repositories/model/user';
import { TaskNotificationRepository } from 'src/repositories/task.notification.repository';

@Injectable()
export class ScheduleTasksService {
  private readonly logger = new Logger(ScheduleTasksService.name);
  constructor(
    @Inject('USER_SERVICE') private readonly userServiceClient: ClientProxy,
    @Inject('MAIL_SERVICE') private readonly mailServiceClient: ClientProxy,
    private readonly taskNotificationRepository: TaskNotificationRepository,
  ) {}

  @Cron(CRON_TIME)
  async dueDateCrossedCron() {
    // if (!Boolean(ENABLE_CRON)) {
    //   this.logger.verbose(
    //     'The task due date notification cron is disabled....',
    //   );
    //   return;
    // }

    // this.logger.verbose('The task due date notification cron as started....');
    // const dbRecords = await this.taskRepository.findRecordsPassedDate(
    //   Date.now(),
    // );
    // const pattern = { cmd: 'mail_send' };
    // const user_pattern = { cmd: 'get_user_by_id' };
    // for (const record of dbRecords) {
    //   this.logger.verbose(`Mail sending for task ${record.title} started ...`);
    //   const userDetails: IUser = await this.userServiceClient
    //     .send(user_pattern, {
    //       id: record.lastUpdatedBy,
    //     })
    //     .toPromise();
    //   const response = await this.mailServiceClient
    //     .send(pattern, {
    //       to: userDetails.email,
    //       subject: `[Reminber]Task ${record.title} has passed due date`,
    //       html: `<center>
    //             <b>Hi there, <br>
    //             The task is passed the due date, please take action<br>
    //             Regards,<br>
    //             Todo team
    //             </center>`,
    //     })
    //     .toPromise();
    //   this.logger.verbose(
    //     `Mail sending for task ${record.title} completed ...`,
    //   );

    //   if ((response.status = HttpStatus.OK)) {
    //     await this.taskNotificationRepository.create(record, 'email');
    //   }
    // }
    // this.logger.verbose('The task due date notification cron as completed....');
  }
}
