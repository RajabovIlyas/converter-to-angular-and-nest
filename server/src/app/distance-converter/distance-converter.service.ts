import { Injectable } from '@nestjs/common';
import { ConversionHistoryService } from '../conversion-history/conversion-history.service';
import { CalculateDistanceConverterDto } from './dtos/calculate-distance-converter.dto';
import { User } from '../user/user.entity';
import { ConversionTypeEnum } from '../conversion-history/enums/conversion-type.enum';
import { DistanceCalculate } from './enums/distance-calculate.enum';

@Injectable()
export class DistanceConverterService {
  private distanceFormat = new Intl.NumberFormat('de-DE', {
    maximumFractionDigits: 2,
  });

  constructor(private conversionHistoryService: ConversionHistoryService) {}

  getDistanceCalculate(data: CalculateDistanceConverterDto) {
    return (
      (data.initialValue / DistanceCalculate[data.initialValueType]) *
      DistanceCalculate[data.convertedValueType]
    );
  }

  async calculate(data: CalculateDistanceConverterDto, user: User) {
    const convertedValue = this.getDistanceCalculate(data);

    const createHistory = {
      type: ConversionTypeEnum.distance,
      initialValue: `${this.distanceFormat.format(data.initialValue)} ${
        data.initialValueType
      }`,
      convertedValue: `${this.distanceFormat.format(convertedValue)} ${
        data.convertedValueType
      }`,
    };
    const conversionHistory = await this.conversionHistoryService.create(
      createHistory,
      user,
    );

    return {
      convertedValue,
      conversionHistory,
    };
  }
}
