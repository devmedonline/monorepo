import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Query,
} from '@nestjs/common';
import { GeneralCategoryService } from './general-category.service';
import { CreateGeneralCategoryDto } from './dto/create-general-category.dto';
import { UpdateGeneralCategoryDto } from './dto/update-general-category.dto';

@Controller('general-category')
export class GeneralCategoryController {
  constructor(
    private readonly generalCategoryService: GeneralCategoryService,
  ) {}

  @Post()
  create(@Body() createGeneralCategoryDto: CreateGeneralCategoryDto) {
    return this.generalCategoryService.create(createGeneralCategoryDto);
  }

  @Get()
  findAll() {
    return this.generalCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.generalCategoryService.findOne(id);
  }

  @Get('search')
  search(@Query('search') search: string) {
    return this.generalCategoryService.search(search);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateGeneralCategoryDto: UpdateGeneralCategoryDto,
  ) {
    return this.generalCategoryService.update(id, updateGeneralCategoryDto);
  }

  @Patch(':id/toggle-public-availability')
  togglePublicAvailability(@Param('id') id: string) {
    return this.generalCategoryService.togglePublicAvailability(id);
  }
}
