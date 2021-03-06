import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import Category from "./Category";

@Entity('transactions')
class Transaction {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  @Column('decimal')
  value: number;

  @Column()
  category_id: string;

  @ManyToOne(() => Category, category => category.transactions, {
    eager: true
  })
  @JoinColumn({ name: 'category_id' })
  category: Category

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}

export default Transaction;
