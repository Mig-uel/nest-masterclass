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
      },
    });
  }

  findAllPostsByUserId(uid: string) {
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

  /**
   * Method for creating a post
   * @param createPostDto
   */
  @Post()
  async create(createPostDto: CreatePostDto) {
    // Create post
    const post = this.postsRepository.create(createPostDto);

    // Return the post
    return this.postsRepository.save(post);
  }

  /**
   * Method for deleting a post
   * @param pid Post ID
   */
  async delete(pid: string) {
    // Find the post
    const post = await this.postsRepository.findOneBy({ id: pid });

    // Handle exception
    if (!post) {
      console.log('No post found!');
      return;
    }

    // Delete the post
    await this.postsRepository.delete(post.id);

    // Return deleted post or confirmation
    return {
      deleted: true,
    };
  }
}
