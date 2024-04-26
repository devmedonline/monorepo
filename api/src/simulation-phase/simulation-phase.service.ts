import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma.service';
import { CreateSimulationPhaseDto } from './dto/create-simulation-phase.dto';
import { FilterSimulationPhaseDto } from './dto/filter-simulation-phase.dto';
import { UpdateSimulationPhaseDto } from './dto/update-simulation-phase.dto';
import { SimulationPhase } from './entities/simulation-phase.entity';

@Injectable()
export class SimulationPhaseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    authorId: string,
    createSimulationPhaseDto: CreateSimulationPhaseDto,
  ) {
    const existingSimulationPhases = await this.prisma.simulationPhase.findMany(
      {
        select: {
          id: true,
          position: true,
        },
        orderBy: {
          position: 'asc',
        },
        where: {
          simulationId: createSimulationPhaseDto.simulationId,
        },
      },
    );

    if (
      existingSimulationPhases.length >= SimulationPhase.MAX_SIMULATION_PHASES
    ) {
      throw new BadRequestException(
        'Maximum number of simulation phases exceeded',
      );
    }

    const isTheFirstSimulationPhase = existingSimulationPhases.length === 0;
    const lastSimulationPhase = existingSimulationPhases.at(-1);
    const position = isTheFirstSimulationPhase
      ? 0
      : lastSimulationPhase.position + 1;

    const simulationPhase = await this.prisma.simulationPhase.create({
      data: {
        id: randomUUID(),
        position,
        language: 'pt-br',
        content: createSimulationPhaseDto.content,
        title: createSimulationPhaseDto.title,
        thumbnail: createSimulationPhaseDto.thumbnail,
        author: {
          connect: {
            id: authorId,
          },
        },
        simulation: {
          connect: {
            id: createSimulationPhaseDto.simulationId,
          },
        },
      },
    });

    return simulationPhase;
  }

  async findAllInSimulation(filter: FilterSimulationPhaseDto) {
    const simulationPhases = await this.prisma.simulationPhase.findMany({
      where: {
        simulationId: filter.simulationId,
        publicAvailable: filter.publicallyAvailable,
      },
    });

    return simulationPhases;
  }

  async findOne(id: string) {
    const simulationPhase = await this.prisma.simulationPhase.findUnique({
      where: {
        id,
      },
    });

    return simulationPhase;
  }

  async update(id: string, updateSimulationPhaseDto: UpdateSimulationPhaseDto) {
    const updatedSimulationPhase = await this.prisma.simulationPhase.update({
      where: {
        id,
      },
      data: {
        title: updateSimulationPhaseDto.title,
        content: updateSimulationPhaseDto.content,
        thumbnail: updateSimulationPhaseDto.thumbnail,
      },
    });

    return updatedSimulationPhase;
  }

  async togglePublicAvailability(id: string) {
    const simulationPhase = await this.prisma.simulationPhase.findUnique({
      where: { id },
    });

    if (!simulationPhase) {
      throw new NotFoundException('SimulationPhase not found');
    }

    const publicAvailable = !simulationPhase.publicAvailable;

    return this.prisma.simulationPhase.update({
      where: { id },
      data: {
        publicAvailable,
      },
    });
  }

  async swapPositions(
    simulationPhaseId: string,
    simulationPhaseToSwapId: string,
  ) {
    const simulationPhase = await this.prisma.simulationPhase.findUnique({
      where: { id: simulationPhaseId },
    });

    const simulationPhaseToSwap = await this.prisma.simulationPhase.findUnique({
      where: { id: simulationPhaseToSwapId },
    });

    if (!simulationPhase || !simulationPhaseToSwap) {
      throw new NotFoundException('SimulationPhase not found');
    }

    const simulationPhasePosition = simulationPhase.position;
    const simulationPhaseToSwapPosition = simulationPhaseToSwap.position;

    const [updatedSimulationPhase, updatedSimulationPhaseToSwap] =
      await this.prisma.$transaction([
        this.prisma.simulationPhase.update({
          where: { id: simulationPhaseId },
          data: { position: simulationPhaseToSwapPosition },
        }),
        this.prisma.simulationPhase.update({
          where: { id: simulationPhaseToSwapId },
          data: { position: simulationPhasePosition },
        }),
      ]);

    return [updatedSimulationPhase, updatedSimulationPhaseToSwap];
  }
}
