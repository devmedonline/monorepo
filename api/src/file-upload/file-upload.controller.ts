import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CheckJWT, User } from 'src/auth/guards/jwt.guard';
import { PageOptionsWithSearchDto } from 'src/common/dtos/page-options.dto';
import { BasicResponseWrapper } from 'src/common/entities/basic-response-wrapper.entity';
import { UserWithPermissions } from 'src/user/dto/user-with-permissions.dto';
import { GetPresignedURLDto } from './dto/create-presigned-url.dto';
import { SaveFileMetadataDto } from './dto/save-file.dto';
import { FileUploadService } from './file-upload.service';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Get()
  @CheckJWT()
  async search(@Query() options: PageOptionsWithSearchDto) {
    return this.fileUploadService.getMedias(options);
  }

  @Post('presigned-url')
  @CheckJWT()
  async getPresignedURL(
    @Body() getPresignedURLDto: GetPresignedURLDto,
    @User() user: UserWithPermissions,
  ) {
    const url = await this.fileUploadService.getSignedURL(
      getPresignedURLDto,
      user.id,
    );

    return new BasicResponseWrapper({ data: url });
  }

  @Post('save')
  @CheckJWT()
  async saveFileMetadata(
    @Body() saveFileMetadataDto: SaveFileMetadataDto,
    @User() user: UserWithPermissions,
  ) {
    const data = await this.fileUploadService.saveFileMetadata(
      saveFileMetadataDto,
      user.id,
    );

    return new BasicResponseWrapper({ data });
  }

  @Delete(':id')
  @CheckJWT()
  async delete(@Param('id') id: string) {
    return new BasicResponseWrapper({
      data: await this.fileUploadService.deleteFile(id),
    });
  }
}
