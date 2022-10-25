import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConversionHistoryModule } from './conversion-history/conversion-history.module';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { environment } from '../environments/environment';
import { CurrencyConverterModule } from './currency-converter/currency-converter.module';
import { DistanceConverterModule } from './distance-converter/distance-converter.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(environment.db),
    AuthModule,
    ConversionHistoryModule,
    CurrencyConverterModule,
    DistanceConverterModule,
    UserModule,
  ],
})
export class AppModule {}
