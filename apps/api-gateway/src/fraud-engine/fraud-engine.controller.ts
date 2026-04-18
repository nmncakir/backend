import { Controller } from '@nestjs/common';
import { FraudEngineService } from './fraud-engine.service';

@Controller('fraud-engine')
export class FraudEngineController {
  constructor(private readonly fraudEngineService: FraudEngineService) {}
}
