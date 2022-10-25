import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ConversionHistoryService } from './conversion-history.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CreateConversionHistoryDto } from './dtos/create-conversion-history.dto';
import { User } from '../user/user.entity';
import { QueryConversionHistoryDto } from './dtos/query-conversion-history.dto';

@UseGuards(JwtAuthGuard)
@Controller('conversion-history')
export class ConversionHistoryController {
  constructor(private conversionHistoryService: ConversionHistoryService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  find(@Query() query: QueryConversionHistoryDto, @Req() req) {
    return this.conversionHistoryService.getByParams(query, req.user as User);
  }
}
