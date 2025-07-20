import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { type ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import JWTConfig from 'src/config/jwt.config';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from '../dtos/sign-in.dto';
import type { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
    private readonly jwtService: JwtService,
    @Inject(JWTConfig.KEY)
    private readonly jwtConfig: ConfigType<typeof JWTConfig>,
  ) {}

  async signIn(signInDto: SignInDto) {
    try {
      // Find user using email provided
      const user = await this.usersService.findOneByEmail(signInDto.email);

      // Handle user not found
      if (!user)
        throw new UnauthorizedException(
          'Invalid credentials. Please try again...',
        );

      // Compare password to the hash
      const isPasswordsMatching = await this.hashingProvider.comparePassword(
        signInDto.password,
        user.password,
      );

      if (!isPasswordsMatching)
        throw new UnauthorizedException(
          'Invalid credentials. Please try again...',
        );

      const accessToken = await this.jwtService.signAsync(
        {
          sub: user.id,
          email: user.email,
        } as ActiveUserData,
        {
          audience: this.jwtConfig.audience,
          issuer: this.jwtConfig.issuer,
          secret: this.jwtConfig.secret,
          expiresIn: this.jwtConfig.accessTokenTTL,
        },
      );

      // Send access token
      return {
        accessToken,
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;

      throw new RequestTimeoutException(
        'Oops, something went wrong. Please try again...',
      );
    }
  }
}
