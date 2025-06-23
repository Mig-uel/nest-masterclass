import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MetaOption } from './meta-options/entities/meta-option.entity';
import { MetaOptionsModule } from './meta-options/meta-options.module';
import { Post } from './posts/entities/post.entity';
import { PostsModule } from './posts/posts.module';
import { Tag } from './tags/entities/tag.entity';
import { TagsModule } from './tags/tags.module';
import { User } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UsersModule,
    PostsModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.PG_HOST,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DATABASE,
      synchronize: true,
      entities: [MetaOption, User, Post, Tag],
      ssl: {
        rejectUnauthorized: false,
      },
    }),
    TagsModule,
    MetaOptionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
