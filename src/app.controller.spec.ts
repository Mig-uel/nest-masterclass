import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  // describe block defines or describe the module that we are testing
  describe('root', () => {
    /**
     * There are four methods that are available within a describe block:
     * beforeEach, beforeAll, afterEach, afterAll
     *
     * beforeEach: any content within this method will run before
     * each test runs
     *
     * beforeAll: any content within this method will run before
     * all test runs
     */
    it('Controller should be defined', () => {
      expect(appController).toBeDefined();
    });
  });
});
