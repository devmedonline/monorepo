import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma.service';
import { CreateSimulationDto } from './dto/create-simulation.dto';
import { FilterSimulationDto } from './dto/filter-simulation.dto';
import { UpdateSimulationDto } from './dto/update-simulation.dto';

@Injectable()
export class SimulationService {
  constructor(private readonly prisma: PrismaService) {}

  async create(authorId: string, createSimulationDto: CreateSimulationDto) {
    const simulation = await this.prisma.simulation.create({
      data: {
        id: randomUUID(),
        language: 'pt-br',
        content: createSimulationDto.content,
        title: createSimulationDto.title,
        thumbnail: createSimulationDto.thumbnail,
        author: {
          connect: {
            id: authorId,
          },
        },
        simulationCategory: {
          connect: {
            id: createSimulationDto.simulationCategoryId,
          },
        },
      },
    });

    return simulation;
  }

  async findAll(filters: FilterSimulationDto) {
    const simulations = await this.prisma.simulation.findMany({
      where: {
        title: {
          contains: filters.search,
        },
        authorId: filters.authorId,
        simulationCategoryId: filters.simulationCategoryId,
      },
    });

    return simulations;
  }

  async findOne(id: string) {
    const simulation = await this.prisma.simulation.findUnique({
      where: {
        id,
      },
      include: {
        simulationPhases: true,
      },
    });

    return simulation;
  }

  async update(id: string, updateSimulationDto: UpdateSimulationDto) {
    const updatedSimulation = await this.prisma.simulation.update({
      where: {
        id,
      },
      data: {
        title: updateSimulationDto.title,
        content: updateSimulationDto.content,
        thumbnail: updateSimulationDto.thumbnail,
      },
    });

    return updatedSimulation;
  }

  async togglePublicAvailability(id: string) {
    const simulation = await this.prisma.simulation.findUnique({
      where: { id },
    });

    if (!simulation) {
      throw new NotFoundException('Simulation not found');
    }

    const publicAvailable = !simulation.publicAvailable;

    return this.prisma.simulation.update({
      where: { id },
      data: {
        publicAvailable,
      },
    });
  }
}
