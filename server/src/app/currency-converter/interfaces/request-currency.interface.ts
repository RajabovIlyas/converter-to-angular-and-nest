export interface RequestCurrency {
  base: string;
  last_updated: number;
  exchange_rates: { [key: string]: number };
}
