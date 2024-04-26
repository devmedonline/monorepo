import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { SimulationPhaseController } from './simulation-phase.controller';
import { SimulationPhaseService } from './simulation-phase.service';

@Module({
  controllers: [SimulationPhaseController],
  providers: [SimulationPhaseService, PrismaService, JwtService],
})
export class SimulationPhaseModule {}
