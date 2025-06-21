import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

/**
 * Service class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {
  /**
   * Injects AuthService via forwardRef
   */
  constructor(
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  /**
   * The method to find all Users from the users table
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
   * The method to find a single user by ID
   */
  findOneById(id: string) {
    return {
      id,
      firstName: 'Alice',
      email: 'alice@email.com',
    };
  }
}
