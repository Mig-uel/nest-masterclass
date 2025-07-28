import { type INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { App } from 'supertest/types';
import { bootstrapNestApp } from 'test/helpers/bootstrap-nest-app.helper';
import { dropDB } from 'test/helpers/drop-db.helper';

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication<App>;
  let config: ConfigService;

  beforeEach(async () => {
    // Instantiating the application
    app = await bootstrapNestApp();

    // Extracting the config
    config = app.get<ConfigService>(ConfigService);
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
