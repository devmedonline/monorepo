import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageOptionsWithSearchDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
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

  async search(pagination: PageOptionsWithSearchDto) {
    const filter = pagination.search
      ? {
          OR: [
            { name: { contains: pagination.search } },
            { description: { contains: pagination.search } },
          ],
        }
      : {};

    const [results, total] = await this.prisma.$transaction([
      this.prisma.simulationCategory.findMany({
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { name: pagination.order },
        where: filter,
      }),
      this.prisma.simulationCategory.count({ where: filter }),
    ]);

    const paginationMeta = new PageMetaDto({
      itemCount: total,
      pageOptionsDto: pagination,
    });

    return new PageDto(results, paginationMeta);
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

  async remove(id: string) {
    return this.prisma.simulationCategory.delete({ where: { id } });
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
