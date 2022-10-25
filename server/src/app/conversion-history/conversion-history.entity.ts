import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ConversionTypeEnum } from './enums/conversion-type.enum';
import { User } from '../user/user.entity';

@Entity()
export class ConversionHistory {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ConversionTypeEnum })
  type: ConversionTypeEnum;

  @Column()
  initialValue: string;

  @Column()
  convertedValue: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'userId' })
  channel: User;
}
