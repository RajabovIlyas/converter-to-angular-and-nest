import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export interface Environment {
  production?: boolean;
  creativeBaseUrl?: string;
  db?: TypeOrmModuleOptions;
  token?: { accessToken: { secret: string }; refreshToken: { secret: string } };
  encryption?: { secret_key: string };
  currencyApi: {
    url: string;
    apiKey: string;
  };
}
