import { Injectable, Post } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MetaOptionsService } from 'src/meta-options/meta-options.service';
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
    private readonly metaOptionsService: MetaOptionsService,
    @InjectRepository(P)
    private readonly postsRepository: Repository<P>,
  ) {}

  findAll() {
    return [{}];
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
    // Create metaOptions
    const metaOptions = createPostDto.metaOptions
      ? await this.metaOptionsService.create(createPostDto.metaOptions)
      : null;

    // Create post
    const post = this.postsRepository.create({
      content: createPostDto.content,
      featuredImageUrl: createPostDto.featuredImageUrl,
      postType: createPostDto.postType,
      publishOn: createPostDto.publishOn,
      schema: createPostDto.schema,
      slug: createPostDto.slug,
      status: createPostDto.status,
      title: createPostDto.title,
    });

    // Add metaOptions
    if (metaOptions) {
      post.metaOption = metaOptions;
    }

    // Return the post
    return this.postsRepository.save(post);
  }
}
