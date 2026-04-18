import { JwtService } from "@app/jwt";
import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
} from "@nestjs/common";

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest();
        const raw = request.headers.authorization;
        if (!raw || typeof raw !== 'string') {
            return false;
        }
        const token = raw.replace(/^Bearer\s+/i, '').trim();
        if (!token) {
            return false;
        }
        try {
            const decoded = await this.jwtService.verifyToken(token);
            request.user = decoded;
            return true;
        } catch {
            throw new UnauthorizedException('Invalid token');
        }
    }
}