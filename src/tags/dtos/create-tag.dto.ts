import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class CreateTagDto {
  @MaxLength(32)
  @MinLength(3)
  @IsString()
  name: string;

  @Matches(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, {
    message:
      'A slug should be all lowercase letters, substituting spaces for dashes',
  })
  @MaxLength(256)
  @IsString()
  slug: string;
}
