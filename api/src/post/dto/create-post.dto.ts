import { IsBoolean, IsString, IsUUID, IsUrl } from 'class-validator';

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsUrl()
  thumbnail: string;

  @IsBoolean()
  publicAvailable: boolean;

  @IsUUID()
  generalCategoryId: string;
}
