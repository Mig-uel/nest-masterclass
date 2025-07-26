import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import type { Model } from 'mongoose';
import { UsersService } from 'src/users/providers/users.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../post.schema';

@Injectable()
export class PostsService {
  constructor(
    /*
     * Injecting UsersService and PostModel
     */
    private readonly usersService: UsersService,
    @InjectModel(Post.name)
    private readonly postModel: Model<Post>,
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

  async create(createPostDto: CreatePostDto) {
    const post = new this.postModel(createPostDto);

    return await post.save();
  }
}
