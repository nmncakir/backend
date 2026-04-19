import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';
import { getKafkaConfig } from '@app/kafka';

@Global()
@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'NOTIFICATION_KAFKA',
        ...getKafkaConfig('notification-producer', 'notification-group'),
      },
    ]),
  ],
  exports: [ClientsModule],
})
export class NotificationKafkaProducerModule {}