import { Environment } from './model';

export const environment: Environment = {
  production: true,
  creativeBaseUrl: 'http://localhost:3000/api',
  token: {
    refreshToken: {
      secret: 'refresh_token_secret',
    },
    accessToken: {
      secret: 'access_token_secret',
    },
  },
  encryption: {
    secret_key: 'vOVH6sdmpNWjRRIqCc7rdxs01lwHzfr3',
  },
  db: {
    type: 'postgres',
    host: 'host.docker.internal',
    port: 5434,
    username: 'user',
    password: 'root',
    database: 'converter',
    synchronize: true,
    autoLoadEntities: true,
  },
  currencyApi: {
    url: 'https://exchange-rates.abstractapi.com/v1/live',
    apiKey: '5312c75791bb49a68e5004b7639094c9',
  },
};
