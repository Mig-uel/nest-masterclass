import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataResponseInterceptor } from './common/interceptors/data-response/data-response.interceptor';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Globally setup ValidationPipe
   */
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unknown properties from request body
      forbidNonWhitelisted: true, // throws an error if unknown properties are found
      transform: true, // transforms an incoming request to an instance of the dto class after validation
      transformOptions: {
        enableImplicitConversion: true,
      }, // enable implicit conversion
    }),
  );

  /**
   * Swagger config
   */
  const config = new DocumentBuilder()
    .setTitle('NestJS Masterclass - Blog App API')
    .setDescription('Use the base API URL of http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense('MIT License', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();

  // Instantiate Swagger document
  const document = SwaggerModule.createDocument(app, config);

  // Use document to complete setup
  SwaggerModule.setup('docs', app, document);

  // Enable cors
  app.enableCors();

  // Global interceptors
  app.useGlobalInterceptors(new DataResponseInterceptor());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => console.error(error));
