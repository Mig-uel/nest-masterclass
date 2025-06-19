import { Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(): string {
    return 'You sent a get request to users endpoint';
  }

  @Post()
  createUsers(): string {
    return 'You sent a post request to users endpoint';
  }
}
