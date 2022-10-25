import { environment } from '../../environments/environment';

const {
  token: { accessToken, refreshToken },
  currencyApi,
} = environment;

export default {
  TOKEN: {
    TYPE: 'Bearer',
    ACCESS_TOKEN: {
      SECRET: accessToken.secret,
      EXPIRES_IN: '60m',
    },
    REFRESH_TOKEN: {
      SECRET: refreshToken.secret,
      EXPIRES_IN: '14d',
    },
  },
  CURRENCY_API: {
    CURRENCY_URL: currencyApi.url,
    SECRET_KEY: currencyApi.apiKey,
  },
  ENCRYPTION: {
    SECRET_KEY: environment.encryption.secret_key,
    ALGORITHM: 'aes-256-ctr',
    SIGNATURE_ALGORITHM: 'SHA256',
  },
  ERRORS: {
    MESSAGES: {
      USER_NOT_FOUND: 'UserNotFound',
      WRONG_TOKEN: 'WrongToken',
    },
  },
};
