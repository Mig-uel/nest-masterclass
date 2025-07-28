import { type INestApplication } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { appCreate } from 'src/app.create';
import { App } from 'supertest/types';
import { dropDB } from 'test/helpers/drop-db.helper';
import { AppModule } from '../../src/app.module';

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication<App>;
  let config: ConfigService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, ConfigModule],
      providers: [ConfigService],
    }).compile();

    app = moduleFixture.createNestApplication();
    appCreate(app);

    config = app.get<ConfigService>(ConfigService);

    await app.init();
  });

  afterEach(async () => {
    await dropDB(config);
    await app.close();
  });

  it.todo('/users - Endpoint is public');
  it.todo('/users - firstName is mandatory');
  it.todo('/users - email is mandatory');
  it.todo('/users - password is mandatory');
  it.todo('/users - Valid request successfully creates user');
  it.todo('/users - password is not returned in response');
  it.todo('/users - googleId is not returned in response');
});
