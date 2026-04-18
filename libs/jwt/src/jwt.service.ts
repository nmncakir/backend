import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService as JwtServiceNest } from '@nestjs/jwt';

@Injectable()
export class JwtService {
  constructor(private readonly jwtService: JwtServiceNest) {}

  async generateToken(payload: object): Promise<string> {
    return this.jwtService.signAsync(payload);
  }

  async verifyToken(token: string): Promise<any> {
    try {
      return await this.jwtService.verifyAsync(token);
    } catch (error) {
      throw new UnauthorizedException('Geçersiz veya süresi dolmuş token');
    }
  }
}