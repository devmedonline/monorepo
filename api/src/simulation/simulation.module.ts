import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { SimulationController } from './simulation.controller';
import { SimulationService } from './simulation.service';

@Module({
  controllers: [SimulationController],
  providers: [SimulationService, PrismaService, JwtService],
})
export class SimulationModule {}
