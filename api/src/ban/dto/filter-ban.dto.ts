import { IsOptional, IsUUID, MaxLength } from 'class-validator';

export class FilterBanDto {
  @IsOptional()
  @IsUUID('all', { message: 'User ID must be a valid UUID' })
  userId?: string;

  @IsOptional()
  @MaxLength(300, { message: 'Ban reason is too long' })
  reason?: string;
}
