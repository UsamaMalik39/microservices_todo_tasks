import { Controller, HttpStatus, Logger } from '@nestjs/common';
import { EmailRequestDto, EmailResponseDto } from 'src/api/dto/mail.dto';
import { MailerService } from '@nest-modules/mailer';
import { MessagePattern } from '@nestjs/microservices';
import { MAILER_DISABLED } from 'src/common/config/app.config';

@Controller()
export class MailController {
  private readonly logger = new Logger(MailController.name);
  constructor(private readonly mailerService: MailerService) {}

  @MessagePattern({ cmd: 'mail_send' })
  async mailSend(data: EmailRequestDto): Promise<EmailResponseDto> {
    if (!Boolean(MAILER_DISABLED)) {
      this.logger.log('The mail send request started.....');
      await this.mailerService.sendMail(data);
      this.logger.log('The mail send request completed.....');
    } else {
      this.logger.log('The mail service is disbaled....');
    }
    return {
      status: HttpStatus.OK,
      message: 'mail_send_success',
    };
  }
}
