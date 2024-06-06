import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { PublicationStatus } from 'src/common/constants/publication-status';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { CreatePostDto } from './dto/create-post.dto';
import { FilterPostDto } from './dto/filter-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async create(authorId: string, createPostDto: CreatePostDto) {
    const language = 'pt-br';

    const post = await this.prisma.post.create({
      data: {
        id: randomUUID(),
        content: createPostDto.content,
        language,
        publicAvailable: createPostDto.publicAvailable,
        thumbnail: createPostDto.thumbnail,
        title: createPostDto.title,
        generalCategory: {
          connect: {
            id: createPostDto.generalCategoryId,
          },
        },
        author: {
          connect: {
            id: authorId,
          },
        },
      },
    });

    return post;
  }

  async search(options: FilterPostDto) {
    const filters = {
      OR: [
        { title: { contains: options?.search } },
        { generalCategoryId: options?.generalCategoryId },
        { authorId: options?.authorId },
        ...this.getPublicFilter(options?.publicAvailable),
      ],
    };

    console.log('filters', filters);

    const [results, total] = await this.prisma.$transaction([
      this.prisma.post.findMany({
        where: filters,
        include: {
          generalCategory: true,
          author: {
            select: {
              id: true,
              name: true,
              avatar: true,
            },
          },
          tags: {
            select: {
              id: true,
              name: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
        skip: options.skip,
        take: options.take,
      }),
      this.prisma.post.count({ where: filters }),
    ]);

    console.log('results', results);

    const paginationMeta = new PageMetaDto({
      itemCount: total,
      pageOptionsDto: options,
    });

    return new PageDto(results, paginationMeta);
  }

  async findAllPublicallyAvailable(filters?: FilterPostDto) {}

  async findOne(id: string) {
    const post = await this.prisma.post.findUnique({
      where: {
        id,
      },
      include: {
        generalCategory: true,
        author: true,
      },
    });

    return {
      ...post,
      author: UserService.toUser(post.author),
    };
  }

  async update(id: string, updatePostDto: UpdatePostDto) {
    const post = await this.prisma.post.update({
      where: {
        id,
      },
      data: {
        ...updatePostDto,
      },
    });

    return post;
  }

  async togglePublicAvailability(id: string) {
    const post = await this.prisma.post.findUnique({
      where: { id },
    });

    if (!post) {
      throw new NotFoundException('Post not found');
    }

    const publicAvailable = !post.publicAvailable;

    return this.prisma.post.update({
      where: { id },
      data: {
        publicAvailable,
      },
    });
  }

  private getPublicFilter(status: PublicationStatus) {
    if (status === 'any') {
      return [{ publicAvailable: true }, { publicAvailable: false }];
    } else {
      const isPublished = status === PublicationStatus.PUBLISHED;
      return [{ publicAvailable: isPublished }];
    }
  }
}
