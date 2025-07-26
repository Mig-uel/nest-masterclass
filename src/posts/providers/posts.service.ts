import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class PostsService {
  constructor(
    /*
     * Injecting Users Service
     */
    private readonly usersService: UsersService,
  ) {}

  public findAll() {
    return [
      {
        title: 'Test Tile',
        content: 'Test Content',
      },
      {
        title: 'Test Tile 2',
        content: 'Test Content 2',
      },
    ];
  }
}
