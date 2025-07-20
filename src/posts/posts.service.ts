import {
  BadRequestException,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import type { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import type { Repository } from 'typeorm';
import { TagsService } from '../tags/tags.service';
import { UsersService } from '../users/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { Post } from './entities/post.entity';
import { CreatePostProvider } from './providers/create-post.provider';

@Injectable()
export class PostsService {
  /**
   * Inject Users Service, Meta Options Service, Tags Service,
   * Posts Repository, PaginationProvider, and CreatePostProvider
   * @param usersService
   * @param metaOptionsService
   * @param postsRepository
   * @param paginationProvider
   */
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private readonly postsRepository: Repository<Post>,
    private readonly tagsService: TagsService,
    private readonly paginationProvider: PaginationProvider,
    private readonly createPostProvider: CreatePostProvider,
  ) {}

  /**
   * Method to get all posts
   * @returns Posts promise
   */
  async findAll(postQuery: GetPostsDto): Promise<Paginated<Post>> {
    return this.paginationProvider.paginateQuery<Post>(
      postQuery,
      this.postsRepository,
    );
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
  async create(createPostDto: CreatePostDto, user: ActiveUserData) {
    return await this.createPostProvider.create(createPostDto, user);
  }

  /**
   * Method for deleting a post
   * @param pid Post ID
   */
  async delete(pid: string) {
    try {
      // Delete the post
      await this.postsRepository.delete(pid);

      // Return deleted post or confirmation
      return {
        deleted: true,
      };
    } catch (error) {
      console.log(error);
      return {
        deleted: false,
      };
    }
  }

  /**
   * Method to update a post
   * @param id
   * @param patchPostDto
   * @returns
   */
  async update(id: string, patchPostDto: PatchPostDto) {
    try {
      // Find the tags
      const tags = await this.tagsService.findMultipleTags(
        patchPostDto.tags || [],
      );

      if (
        patchPostDto.tags?.length &&
        tags.length !== patchPostDto.tags?.length
      ) {
        throw new BadRequestException(
          'One or more invalid tags were passed. Please try again',
        );
      }

      // Find the post
      const post = await this.postsRepository.findOneBy({ id });

      if (!post) throw new NotFoundException(`Post ${id} not found`);

      // Update the properties
      post.title = patchPostDto.title ?? post.title;
      post.content = patchPostDto.content ?? post.content;
      post.status = patchPostDto.status ?? post.status;
      post.postType = patchPostDto.postType ?? post.postType;
      post.slug = patchPostDto.slug ?? post.slug;
      post.featuredImageUrl =
        patchPostDto.featuredImageUrl ?? post.featuredImageUrl;
      post.publishOn = patchPostDto.publishOn ?? post.publishOn;

      // TODO => fix tag updating logic
      // Assign the new tags
      post.tags = tags.length > 0 ? tags : post.tags;

      // Save the post and return it
      return await this.postsRepository.save(post);
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      if (error instanceof BadRequestException) throw error;

      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try again later',
      );
    }
  }
}
