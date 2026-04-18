import { Module } from '@nestjs/common';
import { FraudEngineController } from './fraud-engine.controller';
import { FraudEngineService } from './fraud-engine.service';

@Module({
  imports: [],
  controllers: [FraudEngineController],
  providers: [FraudEngineService],
})
export class FraudEngineModule {}
