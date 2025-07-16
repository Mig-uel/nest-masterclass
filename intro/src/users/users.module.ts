import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import JWTConfig from 'src/auth/config/jwt.config';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import ProfileConfig from './config/profile.config';
import { User } from './entities/user.entity';
import { CreateUserProvider } from './providers/create-user.provider';
import { FindOneUserByEmailProvider } from './providers/find-one-user-by-email';
import { UsersCreateMany } from './providers/users-create-many';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UsersCreateMany,
    CreateUserProvider,
    FindOneUserByEmailProvider,
  ],
  exports: [UsersService],
  imports: [
    TypeOrmModule.forFeature([User]),
    ConfigModule.forFeature(ProfileConfig),
    PaginationModule,
    forwardRef(() => AuthModule),
    ConfigModule.forFeature(JWTConfig),
    JwtModule.registerAsync(JWTConfig.asProvider()),
  ],
})
export class UsersModule {}
