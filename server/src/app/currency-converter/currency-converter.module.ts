import { Module } from '@nestjs/common';
import { CurrencyConverterService } from './currency-converter.service';
import { CurrencyConverterController } from './currency-converter.controller';
import { AuthModule } from '../auth/auth.module';
import { ConversionHistoryModule } from '../conversion-history/conversion-history.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [AuthModule, ConversionHistoryModule, HttpModule],
  providers: [CurrencyConverterService],
  controllers: [CurrencyConverterController],
  exports: [CurrencyConverterService],
})
export class CurrencyConverterModule {}
