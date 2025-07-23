import {
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { PaginationQueryDto } from 'src/common/pagination/dtos/pagination-query.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import ProfileConfig from './config/profile.config';
import { CreateManyUsersDto } from './dtos/create-many-users.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email';
import { UsersCreateMany } from './providers/users-create-many';

// Repo
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { User } from './entities/user.entity';

/**
 * Service class to connect to Users table and perform business operations
 */
@Injectable()
export class UsersService {
  /**
   * Injects User Repository, Config Service, UsersCreateMany Provider,
   * Pagination Provider, and Create User Provider
   */
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject(ProfileConfig.KEY)
    private readonly profileConfig: ConfigType<typeof ProfileConfig>,
    private readonly usersCreateMany: UsersCreateMany,
    private readonly paginationProvider: PaginationProvider,
    private readonly createUserProvider: CreateUserProvider,
    private readonly findOneUserByEmailProvider: FindOneUserByEmailProvider,
    private readonly findOneByGoogleIdProvider: FindOneByGoogleIdProvider,
  ) {}

  /**
   * Method to create new user
   * @param createUserDto CreateUserDto
   */
  async create(createUserDto: CreateUserDto) {
    return this.createUserProvider.create(createUserDto);
  }

  /**
   * The method to find all Users from the users table
   */
  findAll(paginationQuery: PaginationQueryDto) {
    try {
      // Accessing config only accessible to Users module
      console.log(this.profileConfig.apiKey);

      return this.paginationProvider.paginateQuery(
        paginationQuery,
        this.usersRepository,
        {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          posts: true,
        },
      );
    } catch (error) {
      console.log(error);

      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try again later',
      );
    }
  }

  /**
   * The method to find a single user by ID
   */
  async findOneById(id: string) {
    try {
      const user = await this.usersRepository.findOneBy({ id });

      if (!user) throw new NotFoundException(`User with ID #${id} not found`);

      return user;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;

      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try again later',
      );
    }
  }

  /**
   * Retrieves a user entity by their email address.
   *
   * @param email - The email address of the user to find.
   * @returns A promise that resolves to the user entity if found, or `null` if no user exists with the provided email.
   */
  async findOneByEmail(email: string) {
    return await this.findOneUserByEmailProvider.findOneUserByEmail(email);
  }

  async createMany(createUsersDto: CreateManyUsersDto) {
    return await this.usersCreateMany.createMany(createUsersDto);
  }

  async findOneByGoogleId(googleId: string) {
    return await this.findOneByGoogleIdProvider.findOneByGoogleId(googleId);
  }
}
