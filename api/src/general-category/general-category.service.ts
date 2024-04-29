import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/prisma.service';
import { CreateGeneralCategoryDto } from './dto/create-general-category.dto';
import { UpdateGeneralCategoryDto } from './dto/update-general-category.dto';

@Injectable()
export class GeneralCategoryService {
  constructor(private prisma: PrismaService) {}

  async create(createGeneralCategoryDto: CreateGeneralCategoryDto) {
    const generalCategory = await this.prisma.generalCategory.findFirst({
      where: { name: createGeneralCategoryDto.name },
    });

    if (generalCategory) {
      throw new ConflictException('General Category already exists');
    }

    return this.prisma.generalCategory.create({
      data: {
        id: randomUUID(),
        description: createGeneralCategoryDto.description,
        name: createGeneralCategoryDto.name,
        thumbnail: createGeneralCategoryDto.thumbnail,
      },
    });
  }

  async findAll() {
    return this.prisma.generalCategory.findMany();
  }

  async search(search: string) {
    return this.prisma.generalCategory.findMany({
      where: {
        name: { contains: search },
        description: { contains: search },
      },
    });
  }

  async findOne(id: string) {
    return this.prisma.generalCategory.findUnique({ where: { id } });
  }

  async update(id: string, updateGeneralCategoryDto: UpdateGeneralCategoryDto) {
    return this.prisma.generalCategory.update({
      where: { id },
      data: {
        description: updateGeneralCategoryDto.description,
        name: updateGeneralCategoryDto.name,
        thumbnail: updateGeneralCategoryDto.thumbnail,
      },
    });
  }

  async togglePublicAvailability(id: string) {
    const generalCategory = await this.prisma.generalCategory.findUnique({
      where: { id },
    });

    if (!generalCategory) {
      throw new NotFoundException('General Category not found');
    }

    const publicAvailable = !generalCategory.publicAvailable;

    return this.prisma.generalCategory.update({
      where: { id },
      data: {
        publicAvailable,
      },
    });
  }
}
