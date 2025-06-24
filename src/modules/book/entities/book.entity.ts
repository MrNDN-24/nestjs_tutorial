import { Author } from '@/modules/author/entities/author.entity';
import { BookInstance } from '@/modules/bookInstance/entities/bookInstance.entity';
import { Genre } from '@/modules/genre/entities/genre.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  JoinTable,
} from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  summary: string;

  @Column()
  isbn: string;

  @Column()
  url: string;

  @ManyToOne(() => Author, (author) => author.books)
  author: Author;

  @OneToMany(() => BookInstance, (bookInstances) => bookInstances.book, {
    onDelete: 'CASCADE',
  })
  bookInstances: BookInstance[];

  @ManyToMany(() => Genre, (genre) => genre.books, { nullable: true })
  @JoinTable()
  genres?: Genre[];
}
