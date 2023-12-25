import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PrismaService } from 'src/prisma.service';
import { CreateBanDto } from './dto/create-ban.dto';
import { FilterBanDto } from './dto/filter-ban.dto';

@Injectable()
export class BanService {
  constructor(private readonly prisma: PrismaService) {}

  async banUser(createBanDto: CreateBanDto) {
    return this.prisma.ban.create({
      data: {
        id: randomUUID(),
        banDurationInDays: createBanDto.banDurationInDays,
        banReason: createBanDto.banReason,
        user: {
          connect: {
            id: createBanDto.userId,
          },
        },
      },
    });
  }

  async findAll(findAllDto: FilterBanDto) {
    return this.prisma.ban.findMany({
      where: {
        banReason: findAllDto.reason,
        user: {
          id: findAllDto.userId,
        },
      },
    });
  }

  async listUserBans(userId: string) {
    return this.prisma.ban.findMany({
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  async unBanUser(userId: string) {
    const ban = await this.prisma.ban.findFirst({
      where: {
        user: {
          id: userId,
        },
      },
    });

    if (!ban) {
      throw new UnprocessableEntityException('User is not banned');
    }

    return this.prisma.ban.update({
      where: {
        id: ban.id,
      },
      data: {
        unBanTimestamp: new Date(),
      },
    });
  }
}
