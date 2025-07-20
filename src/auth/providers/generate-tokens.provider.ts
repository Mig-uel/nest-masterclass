import { Inject, Injectable } from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import JWTConfig from 'src/config/jwt.config';
import { User } from 'src/users/entities/user.entity';
import type { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class GenerateTokensProvider {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(JWTConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof JWTConfig>,
  ) {}

  /**
   * Generates a signed JWT token for a given user.
   *
   * @template T - Optional payload type to include additional claims in the token.
   * @param {string} userId - The unique identifier of the user (used as the JWT subject).
   * @param {number} expiresIn - Token expiration time in seconds.
   * @param {T} [payload] - Optional additional payload to include in the token.
   * @returns {Promise<string>} - A promise that resolves to the signed JWT token string.
   */
  async signToken<T>(
    userId: string,
    expiresIn: number,
    payload?: T,
  ): Promise<string> {
    return await this.jwtService.signAsync(
      {
        sub: userId,
        ...payload,
      },
      {
        audience: this.jwtConfig.audience,
        issuer: this.jwtConfig.issuer,
        secret: this.jwtConfig.secret,
        expiresIn,
      },
    );
  }

  /**
   * Generates both access and refresh JWT tokens for a given user.
   *
   * @param {User} user - The user entity for whom tokens are generated.
   * @returns {Promise<{ accessToken: string; refreshToken: string }>} - An object containing the access and refresh tokens.
   */
  async generateTokens(
    user: User,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const [accessToken, refreshToken] = await Promise.all([
      // Generate access token
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfig.accessTokenTTL,
        {
          email: user.email,
        },
      ),

      // Generate refresh token
      this.signToken(user.id, this.jwtConfig.refreshTokenTTL),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
