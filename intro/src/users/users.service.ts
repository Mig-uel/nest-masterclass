import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { DataSource } from 'typeorm';
import ProfileConfig from './config/profile.config';
import { CreateUserDto } from './dtos/create-user.dto';

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
   * Injects User Repository, Config Service, and DataSource
   */
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject(ProfileConfig.KEY)
    private readonly profileConfig: ConfigType<typeof ProfileConfig>,
    private readonly dataSource: DataSource,
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
  findAll(limit: number, page: number) {
    try {
      console.log('Limit:', limit, 'Page:', page);

      // Accessing config only accessible to Users module
      console.log(this.profileConfig.apiKey);

      return this.usersRepository.find({
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          posts: true,
        },
      });
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
   * Method to create many users
   * @param createUsersDto
   */
  async createMany(createUsersDto: CreateUserDto[]) {
    // Create a QueryRunner instance
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      // Store created users
      const usersCreated: User[] = [];

      // Connect QueryRunner to datasource
      await queryRunner.connect();

      // Start transaction
      await queryRunner.startTransaction();

      // Loop through the createUsersDto array
      for (const user of createUsersDto) {
        const newUser = queryRunner.manager.create(User, user);
        const result = await queryRunner.manager.save(newUser);

        usersCreated.push(result);
      }

      // If successful, commit to the database
      await queryRunner.commitTransaction();
    } catch (error) {
      console.log(error);

      // If unsuccessful, rollback the changes
      await queryRunner.rollbackTransaction();
    } finally {
      // Release the connection, regardless of status
      await queryRunner.release();
    }
  }
}
