import { IsString, IsUrl } from 'class-validator';

export class CreateSimulationCategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  thumbnail: string;
}
