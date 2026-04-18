import { Controller, Get } from '@nestjs/common';
import { FraudEngineService } from './fraud-engine.service';

@Controller()
export class FraudEngineController {
  constructor(private readonly fraudEngineService: FraudEngineService) {}

  @Get()
  getHello(): string {
    return this.fraudEngineService.getHello();
  }
}
