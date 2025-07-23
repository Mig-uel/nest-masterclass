import { Inject, Injectable, type OnModuleInit } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import JWTConfig from 'src/config/jwt.config';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oAuthClient: OAuth2Client;

  constructor(
    @Inject(JWTConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof JWTConfig>,
  ) {}

  /**
   * NestJS provides us with a lifecycle hook: OnModuleInit
   * That guarantees execution after dependency injection
   */
  onModuleInit() {
    const clientId = this.jwtConfig.googleClientId;
    const clientSecret = this.jwtConfig.googleClientSecret;

    this.oAuthClient = new OAuth2Client(clientId, clientSecret);
  }
}
