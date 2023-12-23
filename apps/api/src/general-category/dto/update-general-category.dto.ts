import { PartialType } from '@nestjs/swagger';
import { CreateGeneralCategoryDto } from './create-general-category.dto';

export class UpdateGeneralCategoryDto extends PartialType(
  CreateGeneralCategoryDto,
) {}
