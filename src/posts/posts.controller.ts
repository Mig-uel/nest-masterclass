import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ActiveUser } from 'src/auth/decorators/active-user.decorator';
import type { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { CreatePostDto } from './dtos/create-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiOperation({
    summary: 'Fetches all posts',
  })
  @Get()
  getPosts(@Query() postQuery: GetPostsDto) {
    return this.postsService.findAll(postQuery);
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
  createPost(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.postsService.create(createPostDto, user);
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
    @Param('id', ParseUUIDPipe) id: string,
    @Body() patchPostDto: PatchPostDto,
  ): any {
    return this.postsService.update(id, patchPostDto);
  }

  @ApiOperation({
    summary: 'Deletes a blog post',
  })
  @ApiResponse({
    description: 'You get a 200 response if the post is deleted successfully',
    status: 200,
  })
  @Delete(':pid')
  deletePost(@Param('pid', ParseUUIDPipe) pid: string): any {
    return this.postsService.delete(pid);
  }
}
