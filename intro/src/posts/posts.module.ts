import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MetaOptionsModule } from 'src/meta-options/meta-options.module';
import { UsersModule } from 'src/users/users.module';
import { Post } from './entities/post.entity';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  imports: [MetaOptionsModule, UsersModule, TypeOrmModule.forFeature([Post])],
  providers: [PostsService],
})
export class PostsModule {}
