import { Module } from '@nestjs/common';
import { ConversionHistoryService } from './conversion-history.service';
import { ConversionHistoryController } from './conversion-history.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConversionHistory } from './conversion-history.entity';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([ConversionHistory]), AuthModule],
  providers: [ConversionHistoryService],
  controllers: [ConversionHistoryController],
  exports: [ConversionHistoryService],
})
export class ConversionHistoryModule {}
