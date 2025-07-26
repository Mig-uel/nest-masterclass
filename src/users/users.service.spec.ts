import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { DataSource } from 'typeorm';
import profileConfig from './config/profile.config';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email';
import { UsersCreateMany } from './providers/users-create-many';
import { UsersService } from './users.service';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const mockCreateUserProvider: Partial<CreateUserProvider> = {
      create(createUserDto: CreateUserDto) {
        return Promise.resolve({
          id: 'some-id',
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName,
          email: createUserDto.email,
          password: createUserDto.password,
        });
      },
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: UsersCreateMany,
          useValue: {},
        },
        {
          provide: PaginationProvider,
          useValue: {},
        },
        {
          provide: CreateUserProvider,
          useValue: mockCreateUserProvider,
        },
        {
          provide: FindOneUserByEmailProvider,
          useValue: {},
        },
        {
          provide: FindOneByGoogleIdProvider,
          useValue: {},
        },
        {
          provide: CreateGoogleUserProvider,
          useValue: {},
        },
        {
          provide: profileConfig.KEY,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should be defined', () => {
      expect(service.create).toBeDefined();
    });

    it('should call create on CreateUserProvider', async () => {
      const user = await service.create({
        email: 'test@email.com',
        firstName: 'John',
        password: 'password',
        lastName: 'Test',
      });

      expect(user.firstName).toEqual('John');
    });
  });
});
