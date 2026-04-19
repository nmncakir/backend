import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validationSchema } from '@app/common';
import configuration from '@app/common/config/configuration';
import { NotificationKafkaConsumerModule } from './kafka/notification-kafka-consumer.module';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [configuration], validationSchema }),
    NotificationKafkaConsumerModule,
  ],
  controllers: [],
  providers: [],
})
export class NotificationModule {}
