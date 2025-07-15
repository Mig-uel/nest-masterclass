import { Injectable } from '@nestjs/common';

@Injectable()
export abstract class HashingProvider {
  /**
   * Hashes a password or buffer data.
   * @param data - The string or buffer to hash.
   * @returns A promise that resolves to the hashed string.
   */
  abstract hashPassword(data: string | Buffer): Promise<string>;

  /**
   * Compares a password or buffer data with an encrypted hash.
   * @param data - The string or buffer to compare.
   * @param encrypted - The hashed string to compare against.
   * @returns A promise that resolves to true if the data matches the hash, false otherwise.
   */
  abstract comparePassword(
    data: string | Buffer,
    encrypted: string,
  ): Promise<boolean>;
}
