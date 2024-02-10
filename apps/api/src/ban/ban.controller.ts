import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { BasicResponseWrapper } from 'src/common/entities/basic-response-wrapper.entity';
import { BanService } from './ban.service';
import { CreateBanDto } from './dto/create-ban.dto';

@Controller('ban')
export class BanController {
  constructor(private readonly banService: BanService) {}

  @Post()
  async banUser(@Body() createBanDto: CreateBanDto) {
    const ban = await this.banService.banUser(createBanDto);
    return new BasicResponseWrapper({ data: ban });
  }

  @Get()
  async findAll(
    @Query('userId') userId: string,
    @Query('reason') reason: string,
  ) {
    const bans = await this.banService.findAll({ userId, reason });
    return new BasicResponseWrapper({ data: bans });
  }

  @Get('user')
  async listUserBans(@Query('userId') userId: string) {
    const bans = await this.banService.listUserBans(userId);
    return new BasicResponseWrapper({ data: bans });
  }

  @Delete(':userId')
  async removeBanById(@Param('userId') userId: string) {
    const removedBan = await this.banService.unBanUser(userId);
    return new BasicResponseWrapper({ data: removedBan });
  }
}
