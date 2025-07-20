import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { TagsService } from 'src/tags/tags.service';
import { UsersService } from 'src/users/users.service';
import { type Repository } from 'typeorm';
import type { CreatePostDto } from '../dtos/create-post.dto';
import { Post } from '../entities/post.entity';

@Injectable()
export class CreatePostProvider {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly tagsService: TagsService,
  ) {}

  /**
   * Method for creating a post
   * @param createPostDto
   */
  async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    try {
      // Find author from database
      const author = await this.usersService.findOneById(user.sub);

      // Find existing slug
      const existingSlug = await this.postsRepository.findOne({
        where: {
          slug: createPostDto.slug,
        },
      });

      if (existingSlug)
        throw new ConflictException(
          'The provided slug is not available, please try again',
        );

      // Finds tags
      const tags = await this.tagsService.findMultipleTags(
        createPostDto.tags || [],
      );

      if (createPostDto.tags && createPostDto.tags?.length !== tags.length)
        throw new ConflictException('Tags are mismatched! Please try again...');

      // Create post
      const post = this.postsRepository.create({
        ...createPostDto,
        author,
        tags,
      });

      // Return the post
      return await this.postsRepository.save(post);
    } catch (error) {
      if (error instanceof ConflictException) throw error;

      throw new BadRequestException(
        'Unable to process your request at the moment, please try again later',
      );
    }
  }
}
