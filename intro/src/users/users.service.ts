import {
  ConflictException,
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
   * and Pagination Provider
   */
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject(ProfileConfig.KEY)
    private readonly profileConfig: ConfigType<typeof ProfileConfig>,
    private readonly usersCreateMany: UsersCreateMany,
    private readonly paginationProvider: PaginationProvider,
  ) {}

  /**
   * Method to create new user
   * @param createUserDto CreateUserDto
   */
  async create(createUserDto: CreateUserDto) {
    try {
      // Check if user email exists
      const existingUser = await this.usersRepository.findOne({
        where: {
          email: createUserDto.email,
        },
      });

      if (existingUser)
        throw new ConflictException('User with this email already exists');

      // Create new user
      const newUser = this.usersRepository.create(createUserDto);

      return await this.usersRepository.save(newUser);
    } catch (error) {
      if (error instanceof ConflictException) throw error;

      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try again later',
      );
    }
  }

  /**
   * The method to find all Users from the users table
   */
  findAll(paginationQuery: PaginationQueryDto) {
    try {
      // Accessing config only accessible to Users module
      console.log(this.profileConfig.apiKey);

      // TODO => fix find logic to handle select
      // return this.usersRepository.find({
      //   select: {
      //     id: true,
      //     email: true,
      //     firstName: true,
      //     lastName: true,
      //     posts: true,
      //   },
      // });

      return this.paginationProvider.paginateQuery(
        paginationQuery,
        this.usersRepository,
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

  async createMany(createUsersDto: CreateManyUsersDto) {
    return await this.usersCreateMany.createMany(createUsersDto);
  }
}
