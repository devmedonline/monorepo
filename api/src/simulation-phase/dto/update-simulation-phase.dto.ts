import { PartialType } from '@nestjs/swagger';
import { CreateSimulationPhaseDto } from './create-simulation-phase.dto';

export class UpdateSimulationPhaseDto extends PartialType(
  CreateSimulationPhaseDto,
) {
  position?: number;
}
