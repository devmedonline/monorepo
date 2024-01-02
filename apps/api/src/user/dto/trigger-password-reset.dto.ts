import { IsEmail, IsString } from 'class-validator';

export class TriggerPasswordResetDto {
  @IsString()
  @IsEmail()
  email: string;
}
