import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entities/book.entity';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { AuthorModule } from '../author/author.module';
import { GenreModule } from '../genre/genre.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Book]),
    AuthorModule,
    forwardRef(() => GenreModule),
  ],
  controllers: [BookController],
  providers: [BookService],
  exports: [BookService],
})
export class BookModule {}
