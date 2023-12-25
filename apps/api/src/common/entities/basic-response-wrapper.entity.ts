import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsObject, IsOptional, IsString } from 'class-validator';

@ApiExtraModels()
export class BasicResponseWrapper<T> {
  @ApiProperty()
  @IsBoolean()
  success: boolean;

  @ApiProperty()
  @IsString()
  message: string;

  @ApiProperty({ type: 'object', additionalProperties: { type: 'string' } })
  @IsOptional()
  @IsObject()
  data?: T;

  @ApiProperty({ type: 'object', additionalProperties: { type: 'string' } })
  @IsOptional()
  @IsObject()
  meta?: any;

  @ApiProperty({ type: 'object', additionalProperties: { type: 'string' } })
  @IsOptional()
  @IsObject()
  links?: Record<string, string>;

  constructor({
    success,
    message,
    data,
    meta,
    links,
  }: {
    success: boolean;
    message: string;
    data?: T;
    meta?: any;
    links?: Record<string, string>;
  }) {
    this.success = success;
    this.message = message;
    this.data = data;
    this.meta = meta;
    this.links = links;
  }
}
