import { IsString, IsUrl } from 'class-validator';

export class CreateGeneralCategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  thumbnail: string;
}
