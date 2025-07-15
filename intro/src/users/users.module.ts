import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import ProfileConfig from './config/profile.config';
import { User } from './entities/user.entity';
import { CreateUserProvider } from './providers/create-user.provider';
import { UsersCreateMany } from './providers/users-create-many';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UsersCreateMany, CreateUserProvider],
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(ProfileConfig),
    PaginationModule,
    forwardRef(() => AuthModule),
  ],
})
export class UsersModule {}
