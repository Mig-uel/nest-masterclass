import { Controller, Get, Param } from '@nestjs/common';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('{/:uid}')
  getPosts(@Param('uid') uid: string) {
    return this.postsService.findAll(uid);
  }
}
