import { Injectable } from '@nestjs/common';
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
   * Injects User Repository
   */
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Create User
   * @param createUserDto CreateUserDto
   */
  async createUser(createUserDto: CreateUserDto) {
    // Check if user email exists
    const existingUser = await this.usersRepository.find({
      where: {
        email: createUserDto.email,
      },
    });

    // Handle exception
    if (existingUser.length) {
      // Handle exception logic
      return;
    }

    // Create new user
    const newUser = this.usersRepository.create(createUserDto);

    // Return the new user
    return await this.usersRepository.save(newUser);
  }

  /**
   * The method to find all Users from the users table
   */
  findAll(limit: number, page: number) {
    console.log(limit, page);

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
    return await this.usersRepository.findOneBy({ id });
  }
}
