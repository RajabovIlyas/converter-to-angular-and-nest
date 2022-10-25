import { Injectable } from '@nestjs/common';
import { ConversionHistoryService } from '../conversion-history/conversion-history.service';
import { CalculateCurrencyConverterDto } from './dtos/calculate-currency-converter.dto';
import { User } from '../user/user.entity';
import constants from '../../common/constants';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { RequestCurrency } from './interfaces/request-currency.interface';
import { ConversionTypeEnum } from '../conversion-history/enums/conversion-type.enum';

const {
  CURRENCY_API: { CURRENCY_URL, SECRET_KEY },
} = constants;

@Injectable()
export class CurrencyConverterService {
  constructor(
    private readonly httpService: HttpService,
    private conversionHistoryService: ConversionHistoryService,
  ) {}

  async getCurrencyCalculate(data: CalculateCurrencyConverterDto) {
    const result = await firstValueFrom(
      this.httpService.get<RequestCurrency>(CURRENCY_URL, {
        params: {
          api_key: SECRET_KEY,
          base: data.initialValueType,
          target: data.convertedValueType,
        },
      }),
    );
    return (
      result.data.exchange_rates[data.convertedValueType] * data.initialValue
    );
  }

  async calculate(data: CalculateCurrencyConverterDto, user: User) {
    const convertedValue = await this.getCurrencyCalculate(data);
    const createHistory = {
      type: ConversionTypeEnum.currency,
      initialValue: new Intl.NumberFormat('ja-DE', {
        style: 'currency',
        currency: data.initialValueType,
      }).format(data.initialValue),
      convertedValue: new Intl.NumberFormat('ja-DE', {
        style: 'currency',
        currency: data.convertedValueType,
      }).format(convertedValue),
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
