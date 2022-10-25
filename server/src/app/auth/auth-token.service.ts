import { AuthResponseDto } from './dtos/auth-response.dto';
import { SecurityService } from './security.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { User } from '../user/user.entity';
import constants from '../../common/constants';
import { UserService } from '../user/user.service';
import { AuthToken } from './interfaces/auth-tokens.interface';
import { AuthTokenData } from './interfaces/auth-token-data.interface';

@Injectable()
export class AuthTokenService {
  constructor(
    private securityService: SecurityService,
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async generateTokensAndSave(userId: string): Promise<AuthResponseDto> {
    const tokens: AuthToken = await this.generateTokens(userId);
    const { refreshToken } = tokens;

    await this.saveRefreshToken(userId, refreshToken);

    return { ...tokens, userId };
  }

  async validateToken(
    token: string,
    tokenType: string,
  ): Promise<AuthTokenData> {
    const data = await this.jwtService.verifyAsync(token, {
      secret: constants.TOKEN[tokenType].SECRET,
    });

    return data;
  }

  private async generateTokens(userId: string): Promise<AuthToken> {
    const payload = { userId };

    const [accessToken, refreshToken] = await Promise.all([
      this.generateAccessToken(payload),
      this.generateRefreshToken(payload),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  private async saveRefreshToken(userId: string, token: string): Promise<void> {
    const hashedToken = await this.securityService.hash(token);
    await this.userService.updateById(userId, { refreshToken: hashedToken });
  }

  private async generateAccessToken({ userId }): Promise<string> {
    const {
      TOKEN: {
        ACCESS_TOKEN: { SECRET, EXPIRES_IN },
      },
    } = constants;

    return this.jwtService.signAsync(
      { sub: userId },
      {
        secret: SECRET,
        expiresIn: EXPIRES_IN,
      },
    );
  }

  private async generateRefreshToken({ userId }): Promise<string> {
    const {
      TOKEN: {
        REFRESH_TOKEN: { SECRET, EXPIRES_IN },
      },
    } = constants;

    return this.jwtService.signAsync(
      { sub: userId },
      {
        secret: SECRET,
        expiresIn: EXPIRES_IN,
      },
    );
  }
}
