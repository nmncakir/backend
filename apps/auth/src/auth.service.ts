import { LoginRequestDto } from '@app/common/dto/auth/request/login-request.dto';
import { RegisterRequestDto } from '@app/common/dto/auth/request/register-request.dto';
import { LoginResponseDto } from '@app/common/dto/auth/response/login-response.dto';
import { Empty } from '@app/grpc/generated/google/protobuf/empty';
import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '@app/prisma';
import { JwtService } from '@app/jwt';
import { ConfigService } from '@nestjs/config';
import { ForgotPasswordRequestDto, ResetPasswordRequestDto, UpdateUserRequestDto, GetMeRequestDto } from '@app/common';
import { GetMeResponse } from '@app/grpc/generated/auth';
import { Metadata } from '@grpc/grpc-js';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(dto: LoginRequestDto): Promise<LoginResponseDto> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const passwordOk = await bcrypt.compare(dto.password, user.password);
    if (!passwordOk) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const token = await this.jwt.generateToken({ email: user.email, username: user.username, id: user.id });
    return { token, expiresAt: this.config.get<string>('JWT_EXPIRES_IN')! };
  }

  async register(dto: RegisterRequestDto): Promise<Empty> {
    const existing = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (existing) {
      throw new BadRequestException('User already exists');
    }
    await this.prisma.user.create({
      data: {
        email: dto.email,
        username: dto.username,
        password: await bcrypt.hash(dto.password, 10),
      },
    });
    return {};
  }

  async updateUser(dto: UpdateUserRequestDto, metadata: Metadata): Promise<GetMeResponse> {
    const userId = JSON.parse(Buffer.from(metadata.get('user')[0].toString(), 'base64').toString()).id;
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    const updated = await this.prisma.user.update({
      where: { id: user.id },
      data: {
        email: dto.email,
        username: dto.username,
        password: dto.password,
      },
    });

    return this.userResponse(updated);
  }

  async forgotPassword(dto: ForgotPasswordRequestDto): Promise<Empty> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {};
  }

  async resetPassword(dto: ResetPasswordRequestDto): Promise<Empty> {
    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.token,
      },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return {};
  }

  private userResponse(user: any): GetMeResponse {
    return {
      email: user.email,
      username: user.username,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
    };
  }
}
