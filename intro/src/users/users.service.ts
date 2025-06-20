import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   * Find all users
   */
  findAll(limit: number, page: number) {
    console.log(limit, page);

    const isAuth = this.authService.isAuth();
    console.log(isAuth);

    return [
      { firstName: 'Alice', email: 'alice@example.com' },
      { firstName: 'Bob', email: 'bob@example.com' },
      { firstName: 'Charlie', email: 'charlie@example.com' },
      { firstName: 'Diana', email: 'diana@example.com' },
      { firstName: 'Eve', email: 'eve@example.com' },
    ];
  }

  /**
   * Find a user by ID
   */
  findOneById(id: string) {
    return {
      id,
      firstName: 'Alice',
      email: 'alice@email.com',
    };
  }
}
