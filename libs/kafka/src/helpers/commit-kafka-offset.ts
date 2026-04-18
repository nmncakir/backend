type KafkaOffsetContext = {
    getConsumer(): {
      commitOffsets(offsets: Array<{ topic: string; partition: number; offset: string }>): Promise<void>;
    };
    getTopic(): string;
    getPartition(): number;
    getMessage(): {
      offset: string;
    };
  };
  
  export async function commitKafkaOffset(ctx: KafkaOffsetContext): Promise<void> {
    const consumer = ctx.getConsumer();
    const topic = ctx.getTopic();
    const partition = ctx.getPartition();
    const message = ctx.getMessage();
    const nextOffset = (BigInt(message.offset) + BigInt(1)).toString();
  
    await consumer.commitOffsets([{ topic, partition, offset: nextOffset }]);
  }
  