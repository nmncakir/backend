import { Module } from '@nestjs/common';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import configuration from '@app/common/config/configuration';
import { validationSchema } from '@app/common/config/validation';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { getKafkaConfig } from '@app/kafka';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
      validationSchema,
    }),
    ClientsModule.register([
      {
        name: 'KAFKA_PRODUCER',
        ...getKafkaConfig('transaction-producer', 'transaction-producer-group')
      },
    ]),
  ],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
