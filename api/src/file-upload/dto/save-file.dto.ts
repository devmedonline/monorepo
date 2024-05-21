import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SaveFileMetadataDto {
  @ApiProperty()
  @IsString({ message: 'A chave do arquivo deve ser uma string' })
  key: string;

  @ApiProperty()
  @IsOptional()
  @IsString({ message: 'O texto que descreve o arquivo deve ser uma string' })
  description?: string;
}
