import { Transport } from '@nestjs/microservices';

export class DiscoveryService {
  private readonly envConfig: { [key: string]: any } = null;
  constructor() {
    this.envConfig = {};
    this.envConfig.todoService = {
      options: {
        port: process.env.TODO_SERVICE_PORT ?? 3000,
        host: process.env.TODO_SERVICE_HOST ?? '0.0.0.0',
      },
      transport: Transport.TCP,
    };
    this.envConfig.userService = {
      options: {
        port: process.env.USER_SERVICE_PORT ?? 3001,
        host: process.env.USER_SERVICE_HOST ?? '0.0.0.0',
      },
      transport: Transport.TCP,
    };
    this.envConfig.loggerService = {
      options: {
        port: process.env.LOGGER_SERVICE_PORT ?? 3002,
        host: process.env.LOGGER_SERVICE_HOST ?? '0.0.0.0',
      },
      transport: Transport.TCP,
    };
  }

  get(key: string): any {
    return this.envConfig[key];
  }
}
