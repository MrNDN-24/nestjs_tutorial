import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from './modules/book/entities/book.entity';
import { Author } from './modules/author/entities/author.entity';
import { Genre } from './modules/genre/entities/genre.entity';
import { BookInstance } from './modules/bookInstance/entities/bookInstance.entity';
import { Repository } from 'typeorm';
import { BookStatus } from './common/enums/global.enum';
@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(Author) private authorRepo: Repository<Author>,
    @InjectRepository(Genre) private genreRepo: Repository<Genre>,
    @InjectRepository(BookInstance)
    private bookInstanceRepo: Repository<BookInstance>,
  ) {}

  async getLibraryStats() {
    const [
      book_count,
      author_count,
      genre_count,
      book_instance_count,
      book_instance_available_count,
    ] = await Promise.all([
      this.bookRepo.count(),
      this.authorRepo.count(),
      this.genreRepo.count(),
      this.bookInstanceRepo.count(),
      this.bookInstanceRepo.count({ where: { status: BookStatus.AVAILABLE } }),
    ]);

    return {
      book_count,
      author_count,
      genre_count,
      book_instance_count,
      book_instance_available_count,
    };
  }
}
