import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, Max, Min } from 'class-validator';
import { Order } from '../constants/order';

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: Order, default: Order.ASC })
  @IsOptional()
  @IsEnum(Order)
  readonly order?: Order = Order.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    maximum: 50,
    default: 10,
  })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}

export class PageOptionsWithSearchDto extends PageOptionsDto {
  @ApiPropertyOptional()
  @IsOptional()
  readonly search?: string;
}
