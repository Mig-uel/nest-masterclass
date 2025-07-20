import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsUUID } from 'class-validator';

export class GetUsersParamDto {
  @ApiProperty({
    description: 'Get user with a specific ID',
    example: 1,
  })
  @Type(() => String)
  @IsUUID()
  id: string;
}
