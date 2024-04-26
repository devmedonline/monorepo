import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { GeneralCategoryController } from './general-category.controller';
import { GeneralCategoryService } from './general-category.service';

@Module({
  controllers: [GeneralCategoryController],
  providers: [GeneralCategoryService, PrismaService, JwtService],
})
export class GeneralCategoryModule {}
