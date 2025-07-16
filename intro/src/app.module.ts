import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { AccessTokenGuard } from './auth/guards/access-token/access-token.guard';
import { PaginationModule } from './common/pagination/pagination.module';
import AppConfig from './config/app.config';
import DatabaseConfig from './config/database.config';
import EnvValidation from './config/env.validation';
import JWTConfig from './config/jwt.config';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { PostsModule } from './posts/posts.module';
import { TagsModule } from './tags/tags.module';
import { UsersModule } from './users/users.module';

const ENV = process.env.NODE_ENV;

@Module({
  providers: [
    // Globally guard routes
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env.development'],
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [AppConfig, DatabaseConfig, JWTConfig],
      validationSchema: EnvValidation,
    }),
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('database.host'),
        username: configService.get('database.username'),
        password: configService.get('database.password'),
        database: configService.get('database.database'),
        synchronize: configService.get('database.synchronize'),
        autoLoadEntities: configService.get('database.autoLoadEntities'),
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    TagsModule,
    MetaOptionsModule,
    PaginationModule,
    JwtModule.registerAsync(JWTConfig.asProvider()),
  ],
})
export class AppModule {}
