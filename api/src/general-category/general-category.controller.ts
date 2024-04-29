import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
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
  async findAll() {
    return new BasicResponseWrapper({
      data: await this.generalCategoryService.findAll(),
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return new BasicResponseWrapper({
      data: await this.generalCategoryService.findOne(id),
    });
  }

  @Get('search')
  async search(@Query('search') search: string) {
    return new BasicResponseWrapper({
      data: await this.generalCategoryService.search(search),
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
}
