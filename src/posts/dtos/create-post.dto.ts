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
  IsUUID,
  Matches,
  MinLength,
  ValidateNested,
} from 'class-validator';
import { CreateMetaOptionsDto } from '../../meta-options/dtos/create-meta-options.dto';
import { PostType, Status } from '../types/types';

export class CreatePostDto {
  @ApiProperty({
    example: 'This is a title',
    description: 'This is the title for the blog post',
  })
  @MinLength(3)
  @IsString()
  title: string;

  @ApiProperty({
    description: `Possible values: ${Object.values(PostType).join(', ')}`,
    enum: PostType,
  })
  @IsEnum(PostType)
  postType: PostType;

  @ApiProperty({
    example: 'my-blog-post',
  })
  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all lowercase letters, substituting spaces for dashes',
  })
  @IsString()
  slug: string;

  @ApiProperty({
    description: `Possible values: ${Object.values(Status).join(', ')}`,
    enum: Status,
  })
  @IsEnum(Status)
  status: Status;

  @ApiPropertyOptional({
    description: 'This is the content of the post',
    example: 'The content of the post',
  })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  content?: string;

  @ApiPropertyOptional({
    description:
      'Serialize your JSON object otherwise a validation error will be thrown ',
    example:
      '{"author":"John Doe","views":123,"tags":["nestjs","typescript"],"published":true}',
  })
  @IsJSON()
  @IsOptional()
  schema?: string;

  @ApiPropertyOptional({
    description: 'Featured image for your blog post',
    example: 'http://localhost:3000/images/image1.jpg',
  })
  @IsUrl()
  @IsOptional()
  featuredImageUrl?: string;

  @ApiPropertyOptional({
    description: 'The date on which the blog post is published',
    example: '2024-06-13T15:30:00Z',
  })
  @IsISO8601()
  @IsOptional()
  publishOn?: Date;

  @ApiPropertyOptional({
    description: 'Array of tag IDs passed as UUID string values',
    example: [
      '123e4567-e89b-12d3-a456-426614174000',
      '223e4567-e89b-12d3-a456-426614174001',
    ],
  })
  @IsUUID('all', { each: true })
  @ArrayNotEmpty()
  @IsOptional()
  tags?: string[];

  @ApiPropertyOptional({
    items: {
      type: 'object',
      properties: {
        metaValue: {
          type: 'json',
          description: 'The metaValue is a JSON string',
          example: '{"sideBarEnabled": true}',
        },
      },
    },
    required: false,
  })
  @ValidateNested({ each: true })
  @Type(() => CreateMetaOptionsDto)
  @IsOptional()
  metaOptions?: CreateMetaOptionsDto | undefined;
}
