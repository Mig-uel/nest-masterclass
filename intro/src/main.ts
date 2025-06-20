import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Globally set up ValidationPipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // strips unknown properties from request body
      forbidNonWhitelisted: true, // throws an error if unknown properties are found
    }),
  );

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap().catch((error) => console.error(error));
