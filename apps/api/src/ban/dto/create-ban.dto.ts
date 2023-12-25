import {
  IsNumber,
  IsPositive,
  IsString,
  IsUUID,
  MaxLength,
} from 'class-validator';

export class CreateBanDto {
  @IsUUID('all', { message: 'User ID must be a valid UUID' })
  userId: string;

  @IsNumber({}, { message: 'Ban duration must be a number' })
  @IsPositive({ message: 'Ban duration must be a positive number' })
  banDurationInDays: number;

  @IsString({ message: 'Ban reason must be a string' })
  @MaxLength(300, { message: 'Ban reason is too long' })
  banReason: string;
}
