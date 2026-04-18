import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AuthModule } from './auth.module';

async function bootstrap() {
  const port = process.env.PORT ?? '50051';
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AuthModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'auth',
        protoPath: join(process.cwd(), 'libs/grpc/proto/auth.proto'),
        url: `0.0.0.0:${port}`,
      },
    },
  );
  await app.listen();
}
void bootstrap();
