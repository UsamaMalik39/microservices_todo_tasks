import { Transport } from '@nestjs/microservices';

export class DiscoveryService {
  private readonly envConfig: { [key: string]: any } = null;
  constructor() {
    this.envConfig = {};
    this.envConfig.userService = {
      options: {
        port: process.env.USER_SERVICE_PORT ?? 3001,
        host: process.env.USER_SERVICE_HOST ?? '0.0.0.0',
      },
      transport: Transport.TCP,
    };
    this.envConfig.mailService = {
      options: {
        port: process.env.MAIL_SERVICE_PORT ?? 3002,
        host: process.env.MAIL_SERVICE_HOST ?? '0.0.0.0',
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
