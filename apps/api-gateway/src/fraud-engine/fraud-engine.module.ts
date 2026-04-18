import { Module } from '@nestjs/common';
import { FraudEngineService } from './fraud-engine.service';
import { FraudEngineController } from './fraud-engine.controller';

@Module({
  controllers: [FraudEngineController],
  providers: [FraudEngineService],
})
export class FraudEngineModule {}
