import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import JWTConfig from 'src/config/jwt.config';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from '../dtos/sign-in.dto';
import { GenerateTokensProvider } from './generate-tokens.provider';

@Injectable()
export class SignInProvider {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly hashingProvider: HashingProvider,
    @Inject(JWTConfig.KEY)
    private readonly generateTokensProvider: GenerateTokensProvider,
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

      // Return access and refresh tokens
      return await this.generateTokensProvider.generateTokens(user);
    } catch (error) {
      if (error instanceof UnauthorizedException) throw error;

      throw new RequestTimeoutException(
        'Oops, something went wrong. Please try again...',
      );
    }
  }
}
