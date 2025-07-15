import { forwardRef, Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptProvider } from './providers/bcrypt.provider';

@Module({
  providers: [AuthService, BcryptProvider],
  controllers: [AuthController],
  imports: [forwardRef(() => UsersModule)],
  exports: [AuthService],
})
export class AuthModule {}
