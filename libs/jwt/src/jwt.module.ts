import { Module } from '@nestjs/common';
import { JwtService } from './jwt.service';
import { JwtModule as JwtModuleNest } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModuleNest.registerAsync({
      inject: [ConfigService], 
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: parseInt(configService.get<string>('JWT_EXPIRES_IN')!),
          algorithm: 'HS256',
        },
      }),
    }),
  ],
  providers: [JwtService],
  exports: [JwtService],
})
export class JwtModule {}
