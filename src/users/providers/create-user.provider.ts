import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingProvider } from 'src/auth/providers/hashing.provider';
import { MailService } from 'src/mail/providers/mail.service';
import type { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/create-user.dto';
import { User } from '../entities/user.entity';

@Injectable()
export class CreateUserProvider {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @Inject(forwardRef(() => HashingProvider))
    private readonly hashingProvider: HashingProvider,
    private readonly mailService: MailService,
  ) {}

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
      const newUser = this.usersRepository.create({
        ...createUserDto,
        password: await this.hashingProvider.hashPassword(
          createUserDto.password,
        ),
      });

      // Send welcome email
      await this.mailService.sendUserWelcome(newUser);

      return await this.usersRepository.save(newUser);
    } catch (error) {
      if (error instanceof ConflictException) throw error;

      throw new RequestTimeoutException(
        'Unable to process your request at the moment, please try again later',
      );
    }
  }
}
