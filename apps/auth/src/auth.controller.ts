import { Controller } from '@nestjs/common';
import { Empty } from '@app/grpc/generated/google/protobuf/empty';
import { LoginRequestDto } from '@app/common/dto/auth/request/login-request.dto';
import { RegisterRequestDto } from '@app/common/dto/auth/request/register-request.dto';
import { LoginResponseDto } from '@app/common/dto/auth/response/login-response.dto';
import { AUTH_SERVICE_NAME } from '@app/grpc/generated/auth';
import { GrpcMethod } from '@nestjs/microservices';
import { AuthService } from './auth.service';
import { GetMeResponse } from '@app/grpc/generated/auth';
import { ForgotPasswordRequestDto, GetMeRequestDto, ResetPasswordRequestDto, UpdateUserRequestDto } from '@app/common';
import { Metadata } from '@grpc/grpc-js';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @GrpcMethod(AUTH_SERVICE_NAME, 'Login')
  async login(data: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(data);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'Register')
  async register(data: RegisterRequestDto): Promise<Empty> {
    return this.authService.register(data);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'UpdateUser')
  async updateUser(data: UpdateUserRequestDto, metadata: Metadata): Promise<GetMeResponse> {
    return this.authService.updateUser(data, metadata);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'ForgotPassword')
  async forgotPassword(data: ForgotPasswordRequestDto): Promise<Empty> {
    return this.authService.forgotPassword(data);
  }

  @GrpcMethod(AUTH_SERVICE_NAME, 'ResetPassword')
  async resetPassword(data: ResetPasswordRequestDto): Promise<Empty> {
    return this.authService.resetPassword(data);
  }
}
