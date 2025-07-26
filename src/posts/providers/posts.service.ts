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
    return this.postModel.find().populate('author tags');
  }

  async create(createPostDto: CreatePostDto) {
    const post = new this.postModel(createPostDto);

    return await post.save();
  }
}
