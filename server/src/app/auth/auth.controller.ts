import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RefreshDto } from './dtos/refresh.dto';
import { AuthResponseDto } from './dtos/auth-response.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  refresh(@Body() data: RefreshDto): Promise<AuthResponseDto> {
    return this.authService.refresh(data);
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.CREATED)
  register(): Promise<AuthResponseDto> {
    return this.authService.register();
  }
}
