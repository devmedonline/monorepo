import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CheckJWT, User } from 'src/auth/guards/jwt.guard';
import { BasicResponseWrapper } from 'src/common/entities/basic-response-wrapper.entity';
import { UserWithPermissions } from 'src/user/dto/user-with-permissions.dto';
import { CreateSimulationDto } from './dto/create-simulation.dto';
import { UpdateSimulationDto } from './dto/update-simulation.dto';
import { SimulationService } from './simulation.service';

@Controller('simulation')
export class SimulationController {
  constructor(private readonly simulationService: SimulationService) {}

  @Post()
  @CheckJWT()
  async create(
    @User() author: UserWithPermissions,
    @Body() createSimulationDto: CreateSimulationDto,
  ) {
    const simulation = await this.simulationService.create(
      author.id,
      createSimulationDto,
    );

    return new BasicResponseWrapper({
      message: 'Simulation created successfully',
      data: simulation,
      success: true,
    });
  }

  @Get()
  async findAll(
    @Query('search') search: string,
    @Query('authorId') authorId: string,
    @Query('simulationCategoryId') simulationCategoryId: string,
  ) {
    const simulations = await this.simulationService.findAll({
      search,
      authorId,
      simulationCategoryId,
    });

    return new BasicResponseWrapper({
      message: 'Simulations fetched successfully',
      data: simulations,
      success: true,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const simulationWithPhases = await this.simulationService.findOne(id);

    return new BasicResponseWrapper({
      message: 'Simulation fetched successfully',
      data: simulationWithPhases,
      success: true,
    });
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateSimulationDto: UpdateSimulationDto,
  ) {
    const updatedSimulation = this.simulationService.update(
      id,
      updateSimulationDto,
    );

    return new BasicResponseWrapper({
      message: 'Simulation updated successfully',
      data: updatedSimulation,
      success: true,
    });
  }

  @Patch(':id/toggle-public-availability')
  async togglePublicAvailability(@Param('id') id: string) {
    const updateSimulation =
      await this.simulationService.togglePublicAvailability(id);

    return new BasicResponseWrapper({
      success: true,
      message: 'Simulation updated successfully',
      data: updateSimulation,
    });
  }
}
