import { Injectable } from '@nestjs/common';
import { UsersService } from './../users/users.service';

@Injectable()
export class PostsService {
  constructor(private readonly usersService: UsersService) {}

  findAll(uid: string) {
    const user = this.usersService.findOneById(uid);

    if (!user) return { message: 'No user found!' };

    return [
      {
        user,
        title: 'First Post',
        content: 'This is the content of the first post.',
      },
      {
        user,
        title: 'Second Post',
        content: 'This is the content of the second post.',
      },
    ];
  }
}
