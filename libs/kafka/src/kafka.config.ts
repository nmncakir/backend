import { KafkaOptions, Transport } from '@nestjs/microservices';

export const getKafkaConfig = (clientId: string, groupId: string): KafkaOptions => ({
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId,
      brokers: process.env.KAFKA_BROKER!.split(','),
    },
    consumer: { groupId, allowAutoTopicCreation: true },
    subscribe: { fromBeginning: false },
  },
});