import { ConversionTypeEnum } from '../enums/conversion-type.enum';
import { IsIn, IsString } from 'class-validator';

export class CreateConversionHistoryDto {
  @IsIn(Object.values(ConversionTypeEnum))
  type: ConversionTypeEnum;

  @IsString()
  initialValue: string;

  @IsString()
  convertedValue: string;
}
