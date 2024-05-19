import { ApiExtraModels, ApiProperty } from '@nestjs/swagger';
import { IsObject, IsOptional } from 'class-validator';

@ApiExtraModels()
export class BasicResponseWrapper<T> {
  @ApiProperty({ type: 'object', additionalProperties: { type: 'string' } })
  @IsOptional()
  @IsObject()
  data: T;

  constructor({ data }: { data: T }) {
    this.data = data;
  }
}
