import { Book } from '@/modules/book/entities/book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, DeleteDateColumn } from 'typeorm';

@Entity()
export class Author {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  first_name: string;

  @Column()
  family_name: string;

  @Column({ type: 'date' })
  date_of_birth: Date;

  @Column({ type: 'date' })
  date_of_death: Date;

  @Column()
  url: string;

  @Column()
  name: string;

  @OneToMany(() => Book, (book) => book.author)
  books: Book[];

  @DeleteDateColumn()
  deletedAt?: Date;
}

