import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/prisma.service';
import { CreateSimulationCategoryDto } from './dto/create-simulation-category.dto';
import { UpdateSimulationCategoryDto } from './dto/update-simulation-category.dto';

@Injectable()
export class SimulationCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createSimulationCategoryDto: CreateSimulationCategoryDto) {
    const simulationCategory = await this.prisma.simulationCategory.findFirst({
      where: { name: createSimulationCategoryDto.name },
    });

    if (simulationCategory) {
      throw new ConflictException('Simulation Category already exists');
    }

    return this.prisma.simulationCategory.create({
      data: {
        id: randomUUID(),
        description: createSimulationCategoryDto.description,
        name: createSimulationCategoryDto.name,
        thumbnail: createSimulationCategoryDto.thumbnail,
      },
    });
  }

  async findAll() {
    return this.prisma.simulationCategory.findMany();
  }

  async search(search: string) {
    return this.prisma.simulationCategory.findMany({
      where: {
        name: { contains: search },
        description: { contains: search },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.simulationCategory.findUnique({ where: { id } });
  }

  async update(
    id: string,
    updateSimulationCategoryDto: UpdateSimulationCategoryDto,
  ) {
    return this.prisma.simulationCategory.update({
      where: { id },
      data: {
        description: updateSimulationCategoryDto.description,
        name: updateSimulationCategoryDto.name,
        thumbnail: updateSimulationCategoryDto.thumbnail,
      },
    });
  }

  async togglePublicAvailability(id: string) {
    const simulationCategory = await this.prisma.simulationCategory.findUnique({
      where: { id },
    });

    if (!simulationCategory) {
      throw new NotFoundException('Simulation Category not found');
    }

    const publicAvailable = !simulationCategory.publicAvailable;

    return this.prisma.simulationCategory.update({
      where: { id },
      data: {
        publicAvailable,
      },
    });
  }
}
