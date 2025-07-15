import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class FindOneUserByEmailProvider {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  /**
   * Finds a user by their email address.
   * @param email - The email address to search for.
   * @returns A promise that resolves to the User entity or null if not found.
   */
  async findOneUserByEmail(email: string) {
    return await this.usersRepository.findOneBy({ email });
  }
}
