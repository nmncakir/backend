import { RegisterRequestDto, UpdateUserRequestDto } from '@app/common';
import { LoginRequestDto, LoginResponseDto } from '@app/common';
import { AUTH_SERVICE_NAME, AuthServiceClient, GetMeResponse } from '@app/grpc/generated/auth';
import { Empty } from '@app/grpc/generated/google/protobuf/empty';
import { Metadata } from '@grpc/grpc-js';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import type { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class AuthService implements OnModuleInit {
  private authServiceClient!: AuthServiceClient;

  constructor(
    @Inject(AUTH_SERVICE_NAME) private readonly client: ClientGrpc,
  ) {}

  onModuleInit(): void {
    this.authServiceClient = this.client.getService<AuthServiceClient>(
      AUTH_SERVICE_NAME,
    );
  }

  async login(dto: LoginRequestDto):Promise<LoginResponseDto> {
    return await lastValueFrom(this.authServiceClient.login(dto));
  } 

  async register(dto: RegisterRequestDto): Promise<Empty> {
    return await lastValueFrom(this.authServiceClient.register(dto));
  }

  async updateUser(dto: UpdateUserRequestDto, user: any): Promise<GetMeResponse> {
    const metadata  = new Metadata();
    metadata.add(
      "user",
      Buffer.from(JSON.stringify({ id: user.id })).toString("base64"),
    );

    return await lastValueFrom(this.authServiceClient.updateUser(dto, metadata));
  }
}