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
import { DistanceConverterService } from './distance-converter.service';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';
import { CalculateDistanceConverterDto } from './dtos/calculate-distance-converter.dto';
import { User } from '../user/user.entity';
import { DISTANCE_TYPE } from './constants/distance-type.constant';

@UseGuards(JwtAuthGuard)
@Controller('distance-converter')
export class DistanceConverterController {
  constructor(private conversionHistoryService: DistanceConverterService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  calculate(@Body() body: CalculateDistanceConverterDto, @Req() req) {
    return this.conversionHistoryService.calculate(body, req.user as User);
  }

  @Get('types')
  @HttpCode(HttpStatus.OK)
  getTypes() {
    return DISTANCE_TYPE;
  }
}
