import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { BadRequestException, Injectable } from '@nestjs/common';
import { isFail, wrapAsync } from 'result';
import { PageMetaDto } from 'src/common/dtos/page-meta.dto';
import { PageOptionsWithSearchDto } from 'src/common/dtos/page-options.dto';
import { PageDto } from 'src/common/dtos/page.dto';
import { nanoid } from 'src/common/lib/uuid';
import { PrismaService } from 'src/prisma.service';
import { ALLOWED_FILE_TYPES, MAX_FILE_SIZE } from './constants/constraints';
import { GetPresignedURLDto } from './dto/create-presigned-url.dto';
import { SaveFileMetadataDto } from './dto/save-file.dto';

@Injectable()
export class FileUploadService {
  private readonly s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_ACCESS_SECRET_KEY!,
    },
  });

  constructor(private readonly prisma: PrismaService) {}

  async getSignedURL(data: GetPresignedURLDto, userId: string) {
    const { fileType, fileSize, checksum, filename } = data;

    if (!ALLOWED_FILE_TYPES.includes(fileType)) {
      throw new BadRequestException(
        `Arquivo do tipo ${fileType} não é permitido`,
      );
    }

    if (fileSize > MAX_FILE_SIZE) {
      throw new BadRequestException(
        `O arquivo excede o tamanho máximo de ${MAX_FILE_SIZE} bytes`,
      );
    }

    const key = this.createKey();

    const putObjectCommand = new PutObjectCommand({
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: key,
      ContentType: fileType,
      ContentLength: fileSize,
      ChecksumSHA256: checksum,
      Metadata: {
        userId: userId,
        filename: filename,
      },
    });

    const SIXTY_SECONDS = 60;

    const url = await getSignedUrl(this.s3Client, putObjectCommand, {
      expiresIn: SIXTY_SECONDS,
    });

    return { url, key };
  }

  async saveFileMetadata(data: SaveFileMetadataDto, userId: string) {
    const media = await this.prisma.media.create({
      data: {
        id: data.key,
        url: this.getURL(data.key),
        description: data.description ?? '',
        author: {
          connect: {
            id: userId,
          },
        },
      },
    });

    return media;
  }

  async deleteFile(key: string) {
    const deletedMediaResult = await wrapAsync(
      this.prisma.media.delete({
        where: {
          id: key,
        },
      }),
    );

    if (isFail(deletedMediaResult)) {
      throw new BadRequestException('Erro ao deletar arquivo');
    }

    const deletedMedia = deletedMediaResult.data;

    const deleteObjectResult = await wrapAsync(
      this.s3Client.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME!,
          Key: key,
        }),
      ),
    );

    // Desfaz a deleção do banco de dados se a deleção do arquivo falhar
    if (isFail(deleteObjectResult)) {
      this.prisma.media.create({
        data: deletedMedia,
      });
    }

    return deletedMedia;
  }

  async getMedias(pagination: PageOptionsWithSearchDto) {
    const filter = {
      description: {
        contains: pagination.search,
      },
    };

    const [results, total] = await this.prisma.$transaction([
      this.prisma.media.findMany({
        skip: pagination.skip,
        take: pagination.take,
        orderBy: { createdAt: pagination.order },
        where: filter,
      }),
      this.prisma.media.count({ where: filter }),
    ]);

    const paginationMeta = new PageMetaDto({
      itemCount: total,
      pageOptionsDto: pagination,
    });

    return new PageDto(results, paginationMeta);
  }

  private getURL(key: string) {
    return `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${key}`;
  }

  private createKey() {
    return nanoid('file', 32);
  }
}
