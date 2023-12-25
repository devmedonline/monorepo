import { Injectable, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
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

  async findAll(filters?: FilterPostDto) {
    return this.prisma.post.findMany({
      where: {
        title: { contains: filters?.search },
        publicAvailable: filters?.publicAvailable,
        generalCategoryId: filters?.generalCategoryId,
        authorId: filters?.authorId,
      },
    });
  }

  async findAllPublicallyAvailable(filters?: FilterPostDto) {
    return this.prisma.post.findMany({
      where: {
        title: { contains: filters?.search },
        publicAvailable: true,
        generalCategoryId: filters?.generalCategoryId,
        authorId: filters?.authorId,
      },
    });
  }

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
}
