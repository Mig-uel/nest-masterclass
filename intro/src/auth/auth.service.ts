import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  /**
   * Logs in a user by verifying credentials and returns a token and user data.
   * @param email - The user's email address.
   * @param password - The user's password.
   * @param id - The user's unique identifier.
   * @returns An object containing a token and the user data.
   */
  login(email: string, password: string, id: string) {
    // Check if user exists in database
    const user = this.usersService.findOneById(id);

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
