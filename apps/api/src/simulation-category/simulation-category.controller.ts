import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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
  async findAll() {
    const simulationCategories = await this.simulationCategoryService.findAll();

    return new BasicResponseWrapper({ data: simulationCategories });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const simulationCategory = await this.simulationCategoryService.findOne(id);

    return new BasicResponseWrapper({ data: simulationCategory });
  }

  @Get('search')
  async search(@Query('search') search: string) {
    const simulationCategories =
      await this.simulationCategoryService.search(search);

    return new BasicResponseWrapper({ data: simulationCategories });
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

  @Patch(':id/toggle-public-availability')
  async togglePublicAvailability(@Param('id') id: string) {
    const updateSimulationCategory =
      await this.simulationCategoryService.togglePublicAvailability(id);

    return new BasicResponseWrapper({ data: updateSimulationCategory });
  }
}
