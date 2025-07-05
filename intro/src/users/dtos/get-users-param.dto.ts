import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsOptional, IsUUID } from 'class-validator';

export class GetUsersParamDto {
  @ApiPropertyOptional({
    description: 'Get user with a specific ID',
    example: 1,
  })
  @Type(() => String)
  @IsUUID()
  @IsOptional()
  id?: number;
}
