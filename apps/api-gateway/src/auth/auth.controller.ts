import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Empty } from '@app/grpc/generated/google/protobuf/empty';
import { RegisterRequestDto, LoginRequestDto, LoginResponseDto, UpdateUserRequestDto } from '@app/common';
import { AuthGuard } from './guard/auth.guard';
import { GetMeResponse } from '@app/grpc/generated/auth';
import { CurrentUser } from './decorators/current-user';
import { Metadata } from '@grpc/grpc-js';
@Controller('auth')
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(@Body() dto: LoginRequestDto): Promise<LoginResponseDto> {
      return await this.authService.login(dto);
    }

    @Post('register')
    async register(@Body() dto: RegisterRequestDto): Promise<Empty> {
      return await this.authService.register(dto);
    }

    @Post('get-me')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async getMe(@CurrentUser() user: any): Promise<GetMeResponse> {
      return user;
    }

    @Post('update-user')
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    async updateUser(@Body() dto: UpdateUserRequestDto, @CurrentUser() user: any): Promise<GetMeResponse> {
      return await this.authService.updateUser(dto, user);
    }
}
