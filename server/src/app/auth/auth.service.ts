import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import constants from '../../common/constants';
import { UserService } from '../user/user.service';
import { AuthTokenService } from './auth-token.service';
import { SecurityService } from './security.service';
import { AuthResponseDto } from './dtos/auth-response.dto';
import { RefreshDto } from './dtos/refresh.dto';

const {
  ERRORS: {
    MESSAGES: { USER_NOT_FOUND, WRONG_TOKEN },
  },
} = constants;

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private authTokenService: AuthTokenService,
    private securityService: SecurityService,
  ) {}

  async register(): Promise<AuthResponseDto> {
    const user = await this.userService.create({ refreshToken: null });

    return this.authTokenService.generateTokensAndSave(user.id);
  }

  async refresh(data: RefreshDto): Promise<AuthResponseDto> {
    const { refreshToken } = data;
    const { sub: userId } = await this.authTokenService.validateToken(
      refreshToken,
      'REFRESH_TOKEN',
    );

    if (!userId) {
      throw new UnauthorizedException(WRONG_TOKEN);
    }

    const user = await this.userService.findById(userId);

    if (!user) {
      throw new NotFoundException(USER_NOT_FOUND);
    }

    const isTokenCorrect = await this.securityService.compare(
      refreshToken,
      user.refreshToken,
    );

    if (!isTokenCorrect) {
      throw new UnauthorizedException(WRONG_TOKEN);
    }

    return this.authTokenService.generateTokensAndSave(user.id);
  }
}
