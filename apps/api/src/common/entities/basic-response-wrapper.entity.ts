import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';

@ApiExtraModels()
export class BasicResponseWrapper<T> {
  @ApiProperty({ type: 'object', additionalProperties: { type: 'string' } })
  @IsOptional()
  @IsObject()
  data: T;

  @ApiProperty({ type: 'object', additionalProperties: { type: 'string' } })
  @IsOptional()
  @IsObject()
  meta?: any;

  @ApiProperty({ type: 'object', additionalProperties: { type: 'string' } })
  @IsOptional()
  @IsObject()
  links?: Record<string, string>;

  constructor({
    data,
    meta,
    links,
  }: {
    data: T;
    meta?: any;
    links?: Record<string, string>;
  }) {
    this.data = data;
    this.meta = meta;
    this.links = links;
  }
}
