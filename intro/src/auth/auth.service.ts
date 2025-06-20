import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  /**
   * Login
   */
  login(email: string, password: string, uid: string) {
    // Check if user exists in database
    const user = this.usersService.findOneById(uid);

    // Login logic
    // Token
    return {
      token: crypto.randomUUID(),
      user,
    };
  }

  /**
   * Check if user is authenticated
   */
  isAuth() {
    return true;
  }
}
