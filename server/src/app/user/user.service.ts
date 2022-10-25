import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  create(data: Omit<User, 'id'>) {
    return this.userRepository.save(data);
  }

  findById(id: string) {
    return this.userRepository.findOne({ where: { id } });
  }

  async updateById(userId: string, data: Partial<User>): Promise<User> {
    const result = await this.userRepository
      .createQueryBuilder()
      .update({
        ...data,
      })
      .where({
        id: userId,
      })
      .returning('*')
      .execute();
    return result.raw[0];
  }
}
