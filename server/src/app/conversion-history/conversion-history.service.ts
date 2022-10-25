import { Injectable } from '@nestjs/common';
import { ConversionHistory } from './conversion-history.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateConversionHistoryDto } from './dtos/create-conversion-history.dto';
import { User } from '../user/user.entity';
import { QueryConversionHistoryDto } from './dtos/query-conversion-history.dto';

@Injectable()
export class ConversionHistoryService {
  constructor(
    @InjectRepository(ConversionHistory)
    private conversionHistoryRepository: Repository<ConversionHistory>,
  ) {}

  create(createData: CreateConversionHistoryDto, user: User) {
    return this.conversionHistoryRepository.save({
      ...createData,
      userId: user.id,
    });
  }

  getByParams({ page, limit, type }: QueryConversionHistoryDto, user: User) {
    const skip = limit * page - limit;

    return this.conversionHistoryRepository.find({
      where: { userId: user.id, type },
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
  }
}
