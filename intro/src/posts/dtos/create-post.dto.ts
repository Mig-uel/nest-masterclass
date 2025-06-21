import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
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

export class CreatePostDto {
  @MinLength(3)
  @IsNotEmpty()
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
  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsEnum(Status)
  status: Status;

  @ApiPropertyOptional()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  content?: string;

  @IsNotEmpty()
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

  @IsArray()
  metaOptions: Record<string, string>[];
}
