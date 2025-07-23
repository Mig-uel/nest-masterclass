import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import type { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class FindOneByGoogleIdProvider {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
  ) {}

  async findOneByGoogleId(googleId: string) {
    return await this.usersRepository.findOneBy({
      googleId,
    });
  }
}
