import { IsIn, IsNumber, IsOptional } from 'class-validator';
import { ConversionTypeEnum } from '../enums/conversion-type.enum';
import { Transform } from 'class-transformer';
import { toNumber } from '../../../common/helpers';

export class QueryConversionHistoryDto {
  @IsIn(Object.values(ConversionTypeEnum))
  type: ConversionTypeEnum;

  @Transform(({ value }) => toNumber(value, { min: 1, default: 10 }))
  @IsNumber()
  @IsOptional()
  limit: number = 10;

  @Transform(({ value }) => toNumber(value, { min: 1, default: 1 }))
  @IsNumber()
  @IsOptional()
  page: number = 1;
}
