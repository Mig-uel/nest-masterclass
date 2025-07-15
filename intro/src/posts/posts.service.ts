import {
  BadRequestException,
  Injectable,
  NotFoundException,
  Post,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import type { Repository } from 'typeorm';
import { TagsService } from '../tags/tags.service';
import { UsersService } from './../users/users.service';
import { CreatePostDto } from './dtos/create-post.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { Post as P } from './entities/post.entity';

@Injectable()
export class PostsService {
  /**
   * Inject Users Service, Meta Options Service, Tags Service,
   * Posts Repository, and PaginationProvider
   * @param usersService
   * @param metaOptionsService
   * @param postsRepository
   * @param paginationProvider
   */
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(P)
    private readonly postsRepository: Repository<P>,
    private readonly tagsService: TagsService,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  /**
   * Method to get all posts
   * @returns Posts promise
   */
  async findAll(postQuery: GetPostsDto) {
    return this.paginationProvider.paginateQuery(
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
  @Post()
  async create(createPostDto: CreatePostDto) {
    try {
      // Find author from database
      const author = await this.usersService.findOneById(
        createPostDto.authorId,
      );

      // Handle no author
      if (!author) {
        console.log('No user found!');
        return;
      }

      // Find existing slug
      const existingSlug = await this.postsRepository.findOne({
        where: {
          slug: createPostDto.slug,
        },
      });

      if (existingSlug)
        throw new BadRequestException(
          'The provided slug is not available, please try again',
        );

      // Finds tags
      const tags = await this.tagsService.findMultipleTags(
        createPostDto.tags || [],
      );

      // Create post
      const post = this.postsRepository.create({
        ...createPostDto,
        author,
        tags,
      });

      // Return the post
      return await this.postsRepository.save(post);
    } catch (error) {
      if (error instanceof BadRequestException) throw error;

      throw new BadRequestException(
        'Unable to process your request at the moment, please try again later',
      );
    }
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
