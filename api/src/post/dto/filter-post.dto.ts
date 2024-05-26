import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional } from 'class-validator';
import { PublicationStatus } from 'src/common/constants/publication-status';
import { PageOptionsWithSearchDto } from 'src/common/dtos/page-options.dto';

export class FilterPostDto extends PageOptionsWithSearchDto {
  @ApiPropertyOptional({
    enum: PublicationStatus,
    default: PublicationStatus.ANY,
  })
  @IsOptional()
  @IsEnum(PublicationStatus)
  publicAvailable?: PublicationStatus = PublicationStatus.ANY;

  @ApiPropertyOptional()
  @IsOptional()
  generalCategoryId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  authorId?: string;

  @ApiPropertyOptional()
  @IsOptional()
  tagId?: string;
}
