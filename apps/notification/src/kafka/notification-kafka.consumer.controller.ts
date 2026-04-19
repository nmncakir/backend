import { Controller } from '@nestjs/common';
import { Ctx, EventPattern, KafkaContext, Payload } from '@nestjs/microservices';
import { KAFKA_TOPICS } from '@app/kafka/kafka.topics';
import { NotificationKafkaConsumer } from './notification-kafka.consumer';
import { commitKafkaOffset } from '@app/kafka/commit-kafka-offset';

@Controller()
export class NotificationKafkaConsumerController {
  constructor(private readonly consumer: NotificationKafkaConsumer) {}

  @EventPattern(KAFKA_TOPICS.EMAIL_WAITING)
  async onEmail(@Payload() payload: unknown, @Ctx() ctx: KafkaContext) {
    const result = await this.consumer.handleEmail(payload);
    await commitKafkaOffset(ctx);
    return result;
  }
}
