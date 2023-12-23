import { Module } from '@nestjs/common';
import { GeneralCategoryService } from './general-category.service';
import { GeneralCategoryController } from './general-category.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [GeneralCategoryController],
  providers: [GeneralCategoryService, PrismaService],
})
export class GeneralCategoryModule {}
