import { MailerOptionsFactory, MailerOptions } from '@nest-modules/mailer';

export class MailerServiceConfig implements MailerOptionsFactory {
  createMailerOptions(): MailerOptions {
    return {
      transport: {
        host: process.env.MAILER_DSN ?? 'smtp.ethereal.email',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: process.env.EMAIL_ID ?? 'amari.schaefer34@ethereal.email', // generated ethereal user
          pass: process.env.EMAIL_PASS ?? 'EjXwsGT5ZTp9ZvgNRf', // generated ethereal password
        },
      },
      defaults: {
        from: process.env.MAILER_FROM ?? 'amari.schaefer34@ethereal.email',
      },
    };
  }
}
