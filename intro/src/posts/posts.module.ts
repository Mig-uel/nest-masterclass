import { Module } from '@nestjs/common';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UsersModule } from 'src/users/users.module';

@Module({
  controllers: [PostsController],
  imports: [UsersModule],
  providers: [PostsService],
})
export class PostsModule {}
