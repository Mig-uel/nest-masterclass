import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import JWTConfig from 'src/auth/config/jwt.config';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(JWTConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof JWTConfig>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      // Extract the request from the ExecutionContext
      const request: Request = context.switchToHttp().getRequest<Request>();

      // Extract the token from the header
      const token = this.extractRequestFromHeader(request);

      // Handle no token
      if (!token) throw new UnauthorizedException('');

      // Validate the token
      const payload = await this.jwtService.verifyAsync<
        Record<string, string | number>
      >(token, this.jwtConfig);

      // Attach payload to request
      request[REQUEST_USER_KEY] = payload;

      return true;
    } catch {
      throw new UnauthorizedException();
    }
  }

  private extractRequestFromHeader(request: Request) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [_, token] = request.headers.authorization?.split(' ') ?? [];

    return token;
  }
}
