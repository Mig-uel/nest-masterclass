import { type INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as request from 'supertest';
import { App } from 'supertest/types';
import { bootstrapNestApp } from 'test/helpers/bootstrap-nest-app.helper';
import { dropDB } from 'test/helpers/drop-db.helper';
import {
  completeUser,
  missingEmail,
  missingFirstName,
} from './users.post.e2e-spec.sample-data';

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication<App>;
  let config: ConfigService;

  let httpServer: App;

  beforeEach(async () => {
    // Instantiating the application
    app = await bootstrapNestApp();

    // Extracting the config
    config = app.get<ConfigService>(ConfigService);

    // Extract HTTP server
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await dropDB(config);
    await app.close();
  });

  it('/users - Endpoint is public', () => {
    return request(httpServer).post('/users').send({}).expect(400);
  });

  it('/users - firstName is mandatory', () => {
    return request(httpServer)
      .post('/users')
      .send(missingFirstName)
      .expect(400);
  });

  it('/users - email is mandatory', () => {
    return request(httpServer).post('/users').send(missingEmail).expect(400);
  });

  it('/users - password is mandatory', () => {
    return request(httpServer)
      .post('/users')
      .send(missingFirstName)
      .expect(400);
  });

  it('/users - Valid request successfully creates user', () => {
    return request(httpServer)
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }: { body: { data: typeof completeUser } }) => {
        expect(body.data).toBeDefined();
        expect(body.data.firstName).toBe(completeUser.firstName);
        expect(body.data.lastName).toBe(completeUser.lastName);
        expect(body.data.email).toBe(completeUser.email);
      });
  });

  it('/users - password is not returned in response', () => {
    return request(httpServer)
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        // eslint-disable-next-line
        expect(body.data.password).toBeUndefined();
      });
  });

  it('/users - googleId is not returned in response', () => {
    return request(httpServer)
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }) => {
        // eslint-disable-next-line
        expect(body.data.googleId).toBeUndefined();
      });
  });
});
