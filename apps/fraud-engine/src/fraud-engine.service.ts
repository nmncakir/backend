import { Injectable } from '@nestjs/common';

@Injectable()
export class FraudEngineService {
  getHello(): string {
    return 'Hello World!';
  }
}
