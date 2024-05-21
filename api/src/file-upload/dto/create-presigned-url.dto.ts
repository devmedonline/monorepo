import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GetPresignedURLDto {
  @ApiProperty()
  @IsString({ message: 'O tipo do arquivo deve ser uma string' })
  fileType: string;

  @ApiProperty()
  @IsNumber({}, { message: 'O tamanho do arquivo deve ser um número' })
  fileSize: number;

  @ApiProperty()
  @IsString({ message: 'O checksum do arquivo deve ser uma string' })
  checksum: string;

  @ApiProperty()
  @IsString({ message: 'O nome do arquivo deve ser uma string' })
  filename: string;
}
