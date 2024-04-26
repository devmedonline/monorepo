import { PartialType } from '@nestjs/swagger';
import { CreateSimulationCategoryDto } from './create-simulation-category.dto';

export class UpdateSimulationCategoryDto extends PartialType(
  CreateSimulationCategoryDto,
) {}
