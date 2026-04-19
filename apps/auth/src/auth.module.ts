import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from '@app/prisma';
import { JwtModule } from '@app/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { validationSchema } from '@app/common';
import { getKafkaConfig } from '@app/kafka';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, validationSchema }),
    PrismaModule,
    JwtModule,
    ClientsModule.register([
      {
        name: 'KAFKA_CLIENT',
        ...getKafkaConfig('auth-producer', 'auth-group')
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
