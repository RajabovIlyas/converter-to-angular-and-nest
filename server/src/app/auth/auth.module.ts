import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { SecurityService } from './security.service';
import { AuthTokenService } from './auth-token.service';
import { UserModule } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [AuthController],
  providers: [AuthService, SecurityService, AuthTokenService],
  imports: [JwtModule.register({}), UserModule],
  exports: [
    AuthService,
    JwtModule,
    AuthTokenService,
    SecurityService,
    UserModule,
  ],
})
export class AuthModule {}
