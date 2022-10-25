import { IsNumber, IsString } from 'class-validator';

export class CalculateDistanceConverterDto {
  @IsNumber()
  initialValue: number;

  @IsString()
  initialValueType: string;

  @IsString()
  convertedValueType: string;
}
