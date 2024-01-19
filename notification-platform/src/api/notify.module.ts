import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { MailerServiceConfig } from 'src/common/mailer.service.config';
import { MailController } from './mail/mail.controller';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useClass: MailerServiceConfig,
    }),
  ],
  providers: [],
  controllers: [MailController],
})
export class NotifyModule {}
