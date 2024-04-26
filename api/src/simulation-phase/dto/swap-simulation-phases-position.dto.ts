import { IsUUID } from 'class-validator';

export class SwapSimulationPhasesPositionDto {
  @IsUUID()
  simulationPhaseId: string;

  @IsUUID()
  simulationPhaseToSwapId: string;
}
