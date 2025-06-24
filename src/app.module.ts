import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { AuthorModule } from './modules/author/author.module';
import { GenreModule } from './modules/genre/genre.module';
import { BookModule } from './modules/book/book.module';
import { BookInstanceModule } from './modules/bookInstance/bookInstance.module';
import { Book } from './modules/book/entities/book.entity';
import { Author } from './modules/author/entities/author.entity';
import { Genre } from './modules/genre/entities/genre.entity';
import { BookInstance } from './modules/bookInstance/entities/bookInstance.entity';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options,
    }),
    TypeOrmModule.forFeature([Book, Author, Genre, BookInstance]),
    AuthorModule,
    GenreModule,
    BookModule,
    BookInstanceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
