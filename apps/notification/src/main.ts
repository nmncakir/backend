import { NestFactory } from '@nestjs/core';
import { NotificationModule } from './notification.module';
import { getKafkaConfig } from '@app/kafka';
import { MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(NotificationModule);

  app.connectMicroservice<MicroserviceOptions>(getKafkaConfig('notification-consumer', 'notification-group'));
  await app.startAllMicroservices();
}
bootstrap();
