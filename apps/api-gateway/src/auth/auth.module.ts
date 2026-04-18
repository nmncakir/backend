import { Module } from '@nestjs/common';
import { JwtModule } from '@app/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { AuthGuard } from './guard/auth.guard';

@Module({
  imports: [JwtModule],
  controllers: [AuthController],
  providers: [AuthService, AuthGuard]
})
export class AuthModule {}
