import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dtos/create-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts() {
    return this.postsService.findAll();
  }

  @Get(':uid')
  getPostsByUserId(@Param('uid') uid: string) {
    return this.postsService.findAllPostsByUserId(uid);
  }

  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return createPostDto;
  }
}
