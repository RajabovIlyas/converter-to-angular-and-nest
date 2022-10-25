import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CurrencyConverterService } from './currency-converter.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CalculateCurrencyConverterDto } from './dtos/calculate-currency-converter.dto';
import { User } from '../user/user.entity';
import { CURRENCY_TYPE } from './constants/currency-type.constant';

@UseGuards(JwtAuthGuard)
@Controller('currency-converter')
export class CurrencyConverterController {
  constructor(private conversionHistoryService: CurrencyConverterService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  calculate(@Body() body: CalculateCurrencyConverterDto, @Req() req) {
    return this.conversionHistoryService.calculate(body, req.user as User);
  }

  @Get('types')
  @HttpCode(HttpStatus.OK)
  getTypes() {
    return CURRENCY_TYPE;
  }
}
