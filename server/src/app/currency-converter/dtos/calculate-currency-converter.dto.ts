import { IsNumber, IsString } from 'class-validator';

export class CalculateCurrencyConverterDto {
  @IsNumber()
  initialValue: number;

  @IsString()
  initialValueType: string;

  @IsString()
  convertedValueType: string;
}
