import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import {
  USER_SERVICE_HOST,
  USER_SERVICE_PORT,
} from './common/config/app.config';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      port: Number(USER_SERVICE_PORT),
      host: USER_SERVICE_HOST,
    },
    transport: Transport.TCP,
  });
  await app.listenAsync();
  console.log(`Application is running ...`);
}
bootstrap();
