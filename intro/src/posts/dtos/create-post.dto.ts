import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayNotEmpty,
  IsEnum,
  IsISO8601,
  IsJSON,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  Matches,
  MinLength,
} from 'class-validator';

enum PostType {
  POST = 'post',
  PAGE = 'page',
  STORY = 'story',
  SERIES = 'series',
}

enum Status {
  DRAFT = 'draft',
  SCHEDULED = 'scheduled',
  REVIEW = 'review',
  published = 'published',
}

interface IPostMetadata {
  key: string;
  value: any;
}

export class CreatePostDto {
  @MinLength(3)
  @IsString()
  title: string;

  @ApiProperty({
    enum: PostType,
  })
  @IsEnum(PostType)
  postType: PostType;

  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all lowercase letters, substituting spaces for dashes',
  })
  @IsString()
  slug: string;

  @IsEnum(Status)
  status: Status;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  content?: string;

  @IsJSON()
  @IsOptional()
  schema?: string;

  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @MinLength(3, { each: true })
  @IsString({
    each: true,
  })
  @ArrayNotEmpty()
  @IsOptional()
  tags?: string[];

  @ArrayNotEmpty()
  @IsOptional()
  metaOptions?: IPostMetadata[];
}
