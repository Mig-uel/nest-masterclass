import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: 'Fetches all posts',
  })
  @Get()
  getPosts() {
    return this.postsService.findAll();
  }

  @ApiOperation({
    summary: 'Fetches all posts by a specific user',
  })
  @Get(':uid')
  getPostsByUserId(@Param('uid') uid: string) {
    return this.postsService.findAllPostsByUserId(uid);
  }

  @ApiOperation({
    summary: 'Creates a new blog post',
  })
  @ApiResponse({
    description: 'You get a 201 response if your post is created successfully',
    status: 201,
  })
  @Post()
  createPost(@Body() createPostDto: CreatePostDto) {
    return this.postsService.create(createPostDto);
  }

  @ApiOperation({
    summary: 'Updates a blog post',
  })
  @ApiResponse({
    description: 'You get a 200 response if the post is updated successfully',
    status: 200,
  })
  @Patch(':id')
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() patchPostDto: PatchPostDto,
  ): any {
    return { ...patchPostDto, id };
  }
}
