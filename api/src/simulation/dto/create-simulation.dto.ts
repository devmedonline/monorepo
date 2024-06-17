import {
  IsBoolean,
  IsNotEmpty,
  IsString,
  IsUUID,
  IsUrl,
} from 'class-validator';

export class CreateSimulationDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUrl()
  @IsNotEmpty()
  thumbnail: string;

  @IsBoolean()
  publicAvailable: boolean;

  @IsUUID()
  simulationCategoryId: string;
}
