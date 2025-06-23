import { IsJSON, IsNotEmpty } from 'class-validator';
import type { IPostMetadata } from '../../posts/types/types';

export class CreateMetaOptionsDto implements IPostMetadata {
  @IsJSON()
  @IsNotEmpty()
  metaValue: string;
}
