import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { UsersService } from './../users/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { Post as P } from './entities/post.entity';

@Injectable()
export class PostsService {
  /**
   * Inject Users Service, Meta Options Service and Posts Repository
   * @param usersService
   * @param metaOptionsService
   * @param postsRepository
   */
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(P)
    private readonly postsRepository: Repository<P>,
  ) {}

  /**
   * Method to get all posts
   * @returns Posts promise
   */
  async findAll() {
    return await this.postsRepository.find({
      relations: {
        metaOptions: true,
        author: true,
      },
    });
  }

  /**
   * Method to find all posts by a specific user
   * @param id
   * @returns
   */
  async findAllPostsByUserId(id: string) {
    const user = await this.usersService.findOneById(id);

    if (!user) return { message: 'No user found!' };

    return user.posts;
  }

  /**
   * Method for creating a post
   * @param createPostDto
   */
  @Post()
  async create(createPostDto: CreatePostDto) {
    // Find author from database
    const author = await this.usersService.findOneById(createPostDto.authorId);

    // Handle exception
    if (!author) {
      console.log('No user found!');
      return;
    }

    // Create post
    const post = this.postsRepository.create({
      ...createPostDto,
      author,
    });

    // Return the post
    return await this.postsRepository.save(post);
  }

  /**
   * Method for deleting a post
   * @param pid Post ID
   */
  async delete(pid: string) {
    // Delete the post
    await this.postsRepository.delete(pid);

    // Return deleted post or confirmation
    return {
      deleted: true,
    };
  }
}
