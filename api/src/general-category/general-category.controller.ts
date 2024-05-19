import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { PageOptionsWithSearchDto } from 'src/common/dtos/page-options.dto';
import { BasicResponseWrapper } from 'src/common/entities/basic-response-wrapper.entity';
import { CreateGeneralCategoryDto } from './dto/create-general-category.dto';
import { UpdateGeneralCategoryDto } from './dto/update-general-category.dto';
import { GeneralCategoryService } from './general-category.service';

@Controller('general-category')
export class GeneralCategoryController {
  constructor(
    private readonly generalCategoryService: GeneralCategoryService,
  ) {}

  @Post()
  async create(@Body() createGeneralCategoryDto: CreateGeneralCategoryDto) {
    return new BasicResponseWrapper({
      data: await this.generalCategoryService.create(createGeneralCategoryDto),
    });
  }

  @Get()
  async search(@Query() options: PageOptionsWithSearchDto) {
    return this.generalCategoryService.search(options);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new BasicResponseWrapper({
      data: await this.generalCategoryService.findOne(id),
    });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateGeneralCategoryDto: UpdateGeneralCategoryDto,
  ) {
    return new BasicResponseWrapper({
      data: await this.generalCategoryService.update(
        id,
        updateGeneralCategoryDto,
      ),
    });
  }

  @Patch(':id/toggle-public-availability')
  async togglePublicAvailability(@Param('id') id: string) {
    return new BasicResponseWrapper({
      data: await this.generalCategoryService.togglePublicAvailability(id),
    });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return new BasicResponseWrapper({
      data: await this.generalCategoryService.remove(id),
    });
  }
}
