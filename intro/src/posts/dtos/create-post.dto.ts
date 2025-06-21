import {
  IsArray,
  IsDate,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
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
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsEnum(PostType)
  postType: PostType;

  @IsNotEmpty()
  @IsString()
  slug: string;

  @IsEnum(Status)
  status: Status;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  content?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  schema?: string;

  @IsUrl()
  @IsOptional()
  featuredImageUrl: string;

  @IsDate()
  publishOn: Date;

  @IsArray({
    each: true,
  })
  tags: string[];

  @IsArray()
  metaOptions: Record<string, string>[];
}
