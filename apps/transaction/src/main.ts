import { NestFactory } from '@nestjs/core';
import { TransactionModule } from './transaction.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { join } from 'path';
import { getKafkaConfig } from '@app/kafka';

async function bootstrap() {
  const app = await NestFactory.create(TransactionModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('TRANSACTION_SERVICE_PORT')!;


  app.useGlobalPipes(new ValidationPipe());

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'transaction',
      protoPath: join(process.cwd(), 'libs/grpc/proto/transaction.proto'),
      url: `0.0.0.0:${port}`,
    }
  })

  app.connectMicroservice<MicroserviceOptions>(getKafkaConfig('transaction-service', 'transaction-group'));
  await app.startAllMicroservices();
}
bootstrap();
