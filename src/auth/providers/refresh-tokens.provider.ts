import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import JWTConfig from 'src/config/jwt.config';
import { UsersService } from 'src/users/users.service';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import type { ActiveUserData } from '../interfaces/active-user-data.interface';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class RefreshTokensProvider {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(JWTConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof JWTConfig>,
    private readonly generateTokensProvider: GenerateTokensProvider,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    try {
      // Verify the refresh token using JWT Service
      const { sub } = await this.jwtService.verifyAsync<
        Pick<ActiveUserData, 'sub'>
      >(refreshTokenDto.refreshToken, {
        secret: this.jwtConfig.secret,
        audience: this.jwtConfig.audience,
        issuer: this.jwtConfig.issuer,
      });

      // Fetch user from the database
      const user = await this.usersService.findOneById(sub);

      // Generate the tokens
      return await this.generateTokensProvider.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
