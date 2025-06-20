import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  /**
   * Find all users
   */
  findAll(limit: number, page: number) {
    console.log(limit, page);
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
