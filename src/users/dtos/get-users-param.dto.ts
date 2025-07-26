import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';

export class GetUsersParamDto {
  @ApiPropertyOptional()
  @IsUUID()
  id: string;
}
