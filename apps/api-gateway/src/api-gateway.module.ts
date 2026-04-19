import { Module } from '@nestjs/common';
import { GrpcClientModule } from '@app/grpc/grpc-client/grpc-client.module';
import configuration from '../../../libs/common/src/config/configuration';
import { validationSchema } from '../../../libs/common/src/config/validation';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { FraudEngineModule } from './fraud-engine/fraud-engine.module';
import { NotificationModule } from './notification/notification.module';
import { TransactionModule } from './transaction/transaction.module';

@Module({
  imports: 
  [    
    ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
    validationSchema,
  }),
  GrpcClientModule.forRoot({
    authServiceUrl: process.env.AUTH_SERVICE_URL!,
  }),
  AuthModule,
  FraudEngineModule,
  NotificationModule,
  TransactionModule],
  controllers: [],
  providers: [],
})
export class ApiGatewayModule {}
