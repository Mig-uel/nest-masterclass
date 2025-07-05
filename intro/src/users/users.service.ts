import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
  RequestTimeoutException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
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
   * Injects User Repository and Config Service
   */
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject(ProfileConfig.KEY)
    private readonly profileConfig: ConfigType<typeof ProfileConfig>,
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
    console.log('Limit:', limit, 'Page:', page);

    // Accessing config only accessible to Users module
    console.log(this.profileConfig.apiKey);

    return [
      { firstName: 'Alice', email: 'alice@example.com' },
      { firstName: 'Bob', email: 'bob@example.com' },
      { firstName: 'Charlie', email: 'charlie@example.com' },
      { firstName: 'Diana', email: 'diana@example.com' },
      { firstName: 'Eve', email: 'eve@example.com' },
    ];
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
}
