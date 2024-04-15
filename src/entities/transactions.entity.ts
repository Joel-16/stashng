import { Entity, Column, CreateDateColumn, BaseEntity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Account } from './account.entity';

@Entity()
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({type: "float"})
  amount: number;

  @Column()
  description: string;

  @Column()
  type: string;

  @ManyToOne(() => Account, (account) => account.transactions, { onDelete: 'NO ACTION' })
  account: Account;

  @CreateDateColumn({type: "timestamp"})
  createdAt: Date;
}
