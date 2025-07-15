import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { HashingProvider } from './hashing.provider';

@Injectable()
export class BcryptProvider implements HashingProvider {
  async hashPassword(data: string | Buffer): Promise<string> {
    // Generate a salt
    const salt = await bcrypt.genSalt();

    // Return hashed password
    return bcrypt.hash(data, salt);
  }

  async comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean> {
    // Return compare boolean
    return await bcrypt.compare(data, encrypted);
  }
}
