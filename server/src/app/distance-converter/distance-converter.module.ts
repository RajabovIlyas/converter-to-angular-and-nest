import { Module } from '@nestjs/common';
import { DistanceConverterService } from './distance-converter.service';
import { DistanceConverterController } from './distance-converter.controller';
import { AuthModule } from '../auth/auth.module';
import { ConversionHistoryModule } from '../conversion-history/conversion-history.module';

@Module({
  imports: [AuthModule, ConversionHistoryModule],
  providers: [DistanceConverterService],
  controllers: [DistanceConverterController],
  exports: [DistanceConverterService],
})
export class DistanceConverterModule {}
