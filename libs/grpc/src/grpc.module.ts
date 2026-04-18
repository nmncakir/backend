import { Module } from '@nestjs/common';
import { GrpcClientModule } from './grpc-client/grpc-client.module';


@Module({
  imports: [GrpcClientModule],
  providers: [ ],
  exports: [],
})
export class GrpcModule {}
