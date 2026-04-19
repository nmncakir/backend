import { LoginRequestDto } from '@app/common/dto/auth/request/login-request.dto';
import { RegisterRequestDto } from '@app/common/dto/auth/request/register-request.dto';
import { LoginResponseDto } from '@app/common/dto/auth/response/login-response.dto';
import { Empty } from '@app/grpc/generated/google/protobuf/empty';
import {
  BadRequestException,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from '@app/prisma';
import { JwtService } from '@app/jwt';
import { ConfigService } from '@nestjs/config';
import { ForgotPasswordRequestDto, ResetPasswordRequestDto, UpdateUserRequestDto } from '@app/common';
import { GetMeResponse } from '@app/grpc';
import { Metadata } from '@grpc/grpc-js';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_TOPICS } from '@app/kafka/kafka.topics';

@Injectable()
export class AuthService implements OnModuleInit {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
    @Inject('KAFKA_CLIENT')
    private readonly kafka: ClientKafka,
  ) {}
  async onModuleInit() {
    await this.kafka.connect();
  }

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

    try { 
      this.kafka.emit(KAFKA_TOPICS.EMAIL_WAITING, {
        to: dto.email,
        subject: "Welcome to Wenlarge",
        text: `Hi ${dto.username} welcome to Wenlarge platform. `,
        html: `<p>Hi ${dto.username},</p><p>Your Wenlarge account was created successfully.</p>`,
        messagedAtEmailWaiting: new Date().toISOString(),
      });
    } catch (error) {
      // ignore it because we don't want to block the user registration
    }
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
