import { Injectable, Logger } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { EmailDispatchService, MailPayload } from '../providers/email-dispatch.service';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_TOPICS } from '@app/kafka/kafka.topics';

@Injectable()
export class NotificationKafkaConsumer {
  private readonly logger = new Logger(NotificationKafkaConsumer.name);

  constructor(
    @Inject("NOTIFICATION_KAFKA")
    private readonly kafka: ClientKafka,
    private readonly email: EmailDispatchService,
  ) {}

  async handleEmail(@Payload() payload: unknown): Promise<void> {
    const p = payload as MailPayload;
    try {
      await this.email.send(p);
      this.kafka.emit(KAFKA_TOPICS.EMAIL_COMPLETED, {
        ...p,
        messagedAtEmailCompleted: new Date().toISOString(),
      });
    } catch (err) {
      this.logger.error(
        `Email send failed: ${err instanceof Error ? err.message : String(err)}`,
        err instanceof Error ? err.stack : undefined,
      );
      this.kafka.emit(KAFKA_TOPICS.EMAIL_FAILED, {
        ...p,
        error: err instanceof Error ? err.message : String(err),
        messagedAtEmailFailed: new Date().toISOString(),
      });
      throw err;
    }
  }
}
