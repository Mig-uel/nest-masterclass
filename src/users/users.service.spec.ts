import { Test, TestingModule } from '@nestjs/testing';
import { CreateGoogleUserProvider } from './providers/create-google-user.provider';
import { UsersService } from './users.service';
import { UsersCreateMany } from './providers/users-create-many';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.provider';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email';
import { FindOneByGoogleIdProvider } from './providers/find-one-by-google-id.provider';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import profileConfig from './config/profile.config';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
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
          useValue: {},
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

  it('UsersService should be defined', () => {});
});
