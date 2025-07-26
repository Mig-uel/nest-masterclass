import { Injectable } from '@nestjs/common';
/**
 * Class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {
  /**
   * The method to get all the users from the database
   */
  public findAll(limit: number, page: number) {
    console.log(limit, page);
    return [
      {
        firstName: 'John',
        email: 'john@doe.com',
      },
      {
        firstName: 'Alice',
        email: 'alice@doe.com',
      },
    ];
  }
  /**
   * Find a single user using the ID of the user
   */
  public findOneById(id: string) {
    return {
      id,
      firstName: 'Alice',
      email: 'alice@doe.com',
    };
  }
}
