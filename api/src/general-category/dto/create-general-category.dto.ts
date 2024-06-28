import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsUrl } from 'class-validator';
import { GeneralCategory } from 'db';
import { BasicResponseWrapper } from 'src/common/entities/basic-response-wrapper.entity';

export class CreateGeneralCategoryDto {
  @IsString()
  name: string;

  @IsString()
  description: string;

  @IsUrl()
  thumbnail: string;
}

export class CreateGeneralCategoryResponseDto extends BasicResponseWrapper<GeneralCategory> {
  @ApiProperty({
    type: 'object',
    properties: {
      id: { type: 'string' },
      name: { type: 'string' },
      description: { type: 'string' },
      publicAvailable: { type: 'boolean' },
      thumbnail: { type: 'string' },
      createdAt: { type: 'string', format: 'date-time' },
      updatedAt: { type: 'string', format: 'date-time' },
    },
  })
  data: {
    id: string;
    name: string;
    description: string;
    publicAvailable: boolean;
    thumbnail: string;
    createdAt: Date;
    updatedAt: Date;
  };
}
