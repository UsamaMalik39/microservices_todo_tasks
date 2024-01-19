import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  TODO_SERVICE_HOST,
  TODO_SERVICE_PORT,
} from './common/config/app.config';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    options: {
      retryAttempts: 5,
      retryDelay: 3000,
      port: Number(TODO_SERVICE_PORT),
      host: TODO_SERVICE_HOST,
    },
    transport: Transport.TCP,
  });
  await app.listenAsync();
  console.log(`Application is running ...`);
}
bootstrap();
