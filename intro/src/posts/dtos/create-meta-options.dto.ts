import { IsNotEmpty, IsString } from 'class-validator';
import type { IPostMetadata } from '../types/types';

export class MetaOptions implements IPostMetadata {
  @IsNotEmpty()
  @IsString()
  key: string;

  @IsNotEmpty()
  value: any;
}
