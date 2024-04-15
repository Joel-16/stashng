import {
  Entity,
  Column,
  CreateDateColumn,
  BaseEntity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transaction } from './transactions.entity';

@Entity()
export class Account extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lastname: string;

  @Column()
  firstname: string;

  @Column()
  email: string;

  @Column({ select: false })
  password: string;

  @OneToMany(() => Transaction, (transactions) => transactions.account, { nullable: true, onDelete: "NO ACTION" })
  @JoinColumn()
  transactions: Transaction[];
  
  @CreateDateColumn({ type: 'timestamp', default: new Date() })
  createdAt: Date;
}
