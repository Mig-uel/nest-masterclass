import type { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { config } from 'aws-sdk';

import { type ConfigType } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AWSConfig from './config/aws.config';

export function appCreate(app: INestApplication): void {
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
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJS Masterclass - Blog App API')
    .setDescription('Use the base API URL of http://localhost:3000')
    .setTermsOfService('http://localhost:3000/terms-of-service')
    .setLicense('MIT License', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3000')
    .setVersion('1.0')
    .build();

  // Instantiate Swagger document
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  // Use document to complete setup
  SwaggerModule.setup('docs', app, document);

  // Setup the AWS sdk for uploading files to S3 bucket
  const awsConfigService = app.get<ConfigType<typeof AWSConfig>>(AWSConfig.KEY);

  config.update({
    credentials: {
      accessKeyId: awsConfigService.awsAccessKey!,
      secretAccessKey: awsConfigService.awsSecretAccessKey!,
    },
    region: awsConfigService.awsRegion!,
  });

  // Enable cors
  app.enableCors();
}
