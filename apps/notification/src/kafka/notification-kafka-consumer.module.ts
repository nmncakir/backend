import { Module } from '@nestjs/common';
import { NotificationKafkaConsumer } from './notification-kafka.consumer';
import { NotificationKafkaConsumerController } from './notification-kafka.consumer.controller';
import { EmailDispatchService } from '../providers/email-dispatch.service';
import { NotificationKafkaProducerModule } from './notification-kafka.module';

@Module({
  imports: [NotificationKafkaProducerModule],
  providers: [
    NotificationKafkaConsumer,
    EmailDispatchService,
  ],
  controllers: [NotificationKafkaConsumerController],
})
export class NotificationKafkaConsumerModule {}
