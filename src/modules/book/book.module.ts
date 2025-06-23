import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { Author } from '../author/entities/author.entity';
import { BookInstance } from '../bookInstance/entities/bookInstance.entity';
import { Genre } from '../genre/entities/genre.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, Author, BookInstance, Genre])],
  controllers: [BookController],
  providers: [BookService],
})
export class BookModule {}
