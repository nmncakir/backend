import { Test, TestingModule } from '@nestjs/testing';
import { FraudEngineController } from './fraud-engine.controller';
import { FraudEngineService } from './fraud-engine.service';

describe('FraudEngineController', () => {
  let fraudEngineController: FraudEngineController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [FraudEngineController],
      providers: [FraudEngineService],
    }).compile();

    fraudEngineController = app.get<FraudEngineController>(FraudEngineController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(fraudEngineController.getHello()).toBe('Hello World!');
    });
  });
});
