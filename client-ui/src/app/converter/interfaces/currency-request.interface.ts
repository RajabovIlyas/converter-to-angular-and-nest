import {ConverterHistory} from "../../history/interfaces/converter-history.interface";

export interface CurrencyRequest{
  convertedValue: number,
  conversionHistory: ConverterHistory;
}
