import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ArrayNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class CreateManyUsersDto {
  @ApiProperty({
    type: 'array',
    required: true,
    items: {
      type: 'User',
    },
  })
  @Type(() => CreateUserDto)
  @ValidateNested({ each: true })
  @ArrayNotEmpty()
  @IsArray()
  users: CreateUserDto[];
}
