import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PageOptionsWithSearchDto } from 'src/common/dtos/page-options.dto';
import { BasicResponseWrapper } from 'src/common/entities/basic-response-wrapper.entity';
import { CreateSimulationCategoryDto } from './dto/create-simulation-category.dto';
import { UpdateSimulationCategoryDto } from './dto/update-simulation-category.dto';
import { SimulationCategoryService } from './simulation-category.service';

@Controller('simulation-category')
export class SimulationCategoryController {
  constructor(
    private readonly simulationCategoryService: SimulationCategoryService,
  ) {}

  @Post()
  async create(
    @Body() createSimulationCategoryDto: CreateSimulationCategoryDto,
  ) {
    const simulationCategory = await this.simulationCategoryService.create(
      createSimulationCategoryDto,
    );

    return new BasicResponseWrapper({ data: simulationCategory });
  }

  @Get()
  async search(@Query() options: PageOptionsWithSearchDto) {
    return this.simulationCategoryService.search(options);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const simulationCategory = await this.simulationCategoryService.findOne(id);

    return new BasicResponseWrapper({ data: simulationCategory });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSimulationCategoryDto: UpdateSimulationCategoryDto,
  ) {
    const updatedSimulationCategory = this.simulationCategoryService.update(
      id,
      updateSimulationCategoryDto,
    );

    return new BasicResponseWrapper({ data: updatedSimulationCategory });
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    const deletedSimulationCategory =
      await this.simulationCategoryService.remove(id);

    return new BasicResponseWrapper({ data: deletedSimulationCategory });
  }

  @Patch(':id/toggle-public-availability')
  async togglePublicAvailability(@Param('id') id: string) {
    const updateSimulationCategory =
      await this.simulationCategoryService.togglePublicAvailability(id);

    return new BasicResponseWrapper({ data: updateSimulationCategory });
  }
}
