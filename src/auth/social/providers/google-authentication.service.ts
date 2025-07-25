import {
  Inject,
  Injectable,
  UnauthorizedException,
  type OnModuleInit,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';
import JWTConfig from 'src/config/jwt.config';
import { UsersService } from 'src/users/users.service';
import { GoogleTokenDto } from '../dtos/google-token.dto';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oAuthClient: OAuth2Client;

  constructor(
    @Inject(JWTConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof JWTConfig>,
    private readonly usersService: UsersService,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {
    const clientId = this.jwtConfig.googleClientId;
    const clientSecret = this.jwtConfig.googleClientSecret;

    this.oAuthClient = new OAuth2Client(clientId, clientSecret);
  }

  /**
   * NestJS provides us with a lifecycle hook: OnModuleInit
   * That guarantees execution after dependency injection
   */
  onModuleInit() {}

  async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      // Verify Google token sent by the user
      const loginTicket = await this.oAuthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });

      // Get payload from loginTicket
      const payload = loginTicket.getPayload();

      if (!payload) throw new UnauthorizedException();

      // Extract the payload from Google JWT
      const {
        email,
        sub: googleId,
        given_name: firstName,
        family_name: lastName,
      } = payload;

      // Find the user in the database using the GoogleId
      const user = await this.usersService.findOneByGoogleId(googleId);

      // If googleId exists in database, generate JWT
      if (user) return this.generateTokensProvider.generateTokens(user);

      if (!email || !googleId || !firstName || !lastName)
        throw new UnauthorizedException();

      // If not, create a new user and then generate JWT
      const newUser = await this.usersService.createGoogleUser({
        email,
        googleId,
        firstName,
        lastName,
      });

      return this.generateTokensProvider.generateTokens(newUser);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
