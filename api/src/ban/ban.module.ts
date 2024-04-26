import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { BanController } from './ban.controller';
import { BanService } from './ban.service';

@Module({
  controllers: [BanController],
  providers: [BanService, PrismaService, JwtService],
})
export class BanModule {}
