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
  DeleteDateColumn,
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

  @ManyToMany(() => Genre, (genre) => genre.books)
  @JoinTable({
    name: 'book_genre',
    joinColumn: { name: 'book_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'genre_id', referencedColumnName: 'id' },
  })
  genres?: Genre[];
  
  @DeleteDateColumn()
  deletedAt?: Date;
}
