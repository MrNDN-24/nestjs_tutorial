import { Book } from '@/modules/book/entities/book.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BookInstance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  imprint: string;

  @Column()
  status: string;

  @Column({ type: 'date' })
  due_back: Date;

  @Column()
  url: string;

  @ManyToOne(() => Book, (book) => book.bookInstances)
  book: Book;
}
