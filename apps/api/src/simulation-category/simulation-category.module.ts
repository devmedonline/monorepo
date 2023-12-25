import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { SimulationCategoryController } from './simulation-category.controller';
import { SimulationCategoryService } from './simulation-category.service';

@Module({
  controllers: [SimulationCategoryController],
  providers: [SimulationCategoryService, PrismaService, JwtService],
})
export class SimulationCategoryModule {}
