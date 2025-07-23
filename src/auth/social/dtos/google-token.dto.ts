import { IsJWT } from 'class-validator';

export class GoogleTokenDto {
  @IsJWT()
  token: string;
}
