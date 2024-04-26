import { IsNotEmpty, IsString, IsUUID, IsUrl } from 'class-validator';

export class CreateSimulationPhaseDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsUrl()
  @IsNotEmpty()
  thumbnail: string;

  @IsUUID()
  simulationId: string;
}
