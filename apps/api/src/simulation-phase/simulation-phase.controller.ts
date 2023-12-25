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
import { CreateSimulationPhaseDto } from './dto/create-simulation-phase.dto';
import { SwapSimulationPhasesPositionDto } from './dto/swap-simulation-phases-position.dto';
import { UpdateSimulationPhaseDto } from './dto/update-simulation-phase.dto';
import { SimulationPhaseService } from './simulation-phase.service';

@Controller('simulation-phase')
export class SimulationPhaseController {
  constructor(
    private readonly simulationPhaseService: SimulationPhaseService,
  ) {}

  @Post()
  @CheckJWT()
  async create(
    @User() author: UserWithPermissions,
    @Body() createSimulationPhaseDto: CreateSimulationPhaseDto,
  ) {
    const simulationPhase = await this.simulationPhaseService.create(
      author.id,
      createSimulationPhaseDto,
    );

    return new BasicResponseWrapper({
      message: 'Simulation phase created successfully',
      data: simulationPhase,
      success: true,
    });
  }

  @Get()
  async findAllInSimulation(@Query('simulationId') simulationId: string) {
    const simulations = await this.simulationPhaseService.findAllInSimulation({
      simulationId,
      publicallyAvailable: true,
    });

    return new BasicResponseWrapper({
      message: 'Simulation phases fetched successfully',
      data: simulations,
      success: true,
    });
  }

  @Get('all')
  @CheckJWT()
  async findAllInSimulationForUser(
    @Query('simulationId') simulationId: string,
  ) {
    const simulations = await this.simulationPhaseService.findAllInSimulation({
      simulationId,
      publicallyAvailable: undefined,
    });

    return new BasicResponseWrapper({
      message: 'Simulation phases fetched successfully',
      data: simulations,
      success: true,
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const simulationPhase = await this.simulationPhaseService.findOne(id);

    return new BasicResponseWrapper({
      message: 'Simulation phase fetched successfully',
      data: simulationPhase,
      success: true,
    });
  }

  @Patch(':id')
  @CheckJWT()
  async update(
    @Param('id') id: string,
    @Body() updateSimulationPhaseDto: UpdateSimulationPhaseDto,
  ) {
    const updateSimulationPhase = await this.simulationPhaseService.update(
      id,
      updateSimulationPhaseDto,
    );

    return new BasicResponseWrapper({
      message: 'Simulation phase updated successfully',
      data: updateSimulationPhase,
      success: true,
    });
  }

  @Patch(':id/toggle-public-availability')
  @CheckJWT()
  async togglePublicAvailability(@Param('id') id: string) {
    const updateSimulation =
      await this.simulationPhaseService.togglePublicAvailability(id);

    return new BasicResponseWrapper({
      success: true,
      message: 'Simulation phase updated successfully',
      data: updateSimulation,
    });
  }

  @Patch('/swap/')
  @CheckJWT()
  async swap(@Body() swap: SwapSimulationPhasesPositionDto) {
    const simulationPhases = await this.simulationPhaseService.swapPositions(
      swap.simulationPhaseId,
      swap.simulationPhaseToSwapId,
    );

    return new BasicResponseWrapper({
      message: 'Simulation phases swapped successfully',
      data: simulationPhases,
      success: true,
    });
  }
}
