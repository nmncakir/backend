import { NestFactory } from '@nestjs/core';
import { FraudEngineModule } from './fraud-engine.module';

async function bootstrap() {
  const app = await NestFactory.create(FraudEngineModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
