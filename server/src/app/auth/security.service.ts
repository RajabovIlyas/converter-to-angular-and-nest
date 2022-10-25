import { Injectable } from '@nestjs/common';
import { hash, compare, genSalt } from 'bcrypt';
import crypto from 'crypto';

import constants from '../../common/constants';

const {
  ENCRYPTION: { ALGORITHM, SIGNATURE_ALGORITHM, SECRET_KEY },
} = constants;

const STRING_ENCODING_TYPE = 'hex';

@Injectable()
export class SecurityService {
  async hash(data: string): Promise<string> {
    const salt = await genSalt();
    return hash(data, salt);
  }

  compare(value1: string, value2: string): Promise<boolean> {
    return compare(value1, value2);
  }

  async getPassword(): Promise<{ password: string; hashedPassword: string }> {
    const password = this.generatePassword();
    const hashedPassword = await this.hash(password);

    return {
      password,
      hashedPassword,
    };
  }

  private generatePassword(): string {
    return Math.random().toString(36).slice(-8);
  }

  encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
    const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);

    return {
      iv: iv.toString(STRING_ENCODING_TYPE),
      content: encrypted.toString(STRING_ENCODING_TYPE),
    };
  }

  decrypt(hash) {
    if (typeof hash === 'string') {
      hash = JSON.parse(hash);
    }

    const decipher = crypto.createDecipheriv(
      ALGORITHM,
      SECRET_KEY,
      Buffer.from(hash.iv, STRING_ENCODING_TYPE),
    );

    const decrpyted = Buffer.concat([
      decipher.update(Buffer.from(hash.content, STRING_ENCODING_TYPE)),
      decipher.final(),
    ]);

    return decrpyted.toString();
  }

  compareSignature(signature: string, secret: string, body: object): boolean {
    const computedSignature = crypto
      .createHmac(SIGNATURE_ALGORITHM, secret)
      .update(JSON.stringify(body))
      .digest(STRING_ENCODING_TYPE);

    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(computedSignature),
    );
  }
}
