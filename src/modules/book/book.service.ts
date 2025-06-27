import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { Author } from '../author/entities/author.entity';
import { Genre } from '../genre/entities/genre.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { BookSerializer } from './serializers/book.serializer';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private bookRepo: Repository<Book>) {}

  async findAll(): Promise<BookSerializer[]> {
    try {
      const books = await this.bookRepo.find({
        relations: ['author', 'bookInstances', 'genres'],
        order: { title: 'ASC' },
      });
      return plainToInstance(BookSerializer, books, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch books: ${error.message}`,
      );
    }
  }

  async findOneById(id: number): Promise<BookSerializer> {
    const book = await this.bookRepo.findOne({
      where: { id },
      relations: ['author', 'genres', 'bookInstances'],
    });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);
    return plainToInstance(BookSerializer, book, {
      excludeExtraneousValues: true,
    });
  }

  async create(data: CreateBookDto): Promise<BookSerializer> {
    try {
      const author = await this.bookRepo.manager.findOne(Author, {
        where: { id: data.authorId },
      });
      if (!author) {
        throw new NotFoundException(
          `Author with id ${data.authorId} not found`,
        );
      }

      const genres = await this.bookRepo.manager.find(Genre, {
        where: { id: In(data.genreIds || []) },
      });

      const book = this.bookRepo.create({ ...data, author, genres });
      const saved = await this.bookRepo.save(book);
      return plainToInstance(BookSerializer, saved, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new BadRequestException(
        `Invalid data for book creation: ${error.message}`,
      );
    }
  }

  async update(data: UpdateBookDto, id: number): Promise<BookSerializer> {
    const book = await this.bookRepo.findOne({
      where: { id },
      relations: ['author', 'genres'],
    });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }

    try {
      Object.assign(book, {
        title: data.title ?? book.title,
        summary: data.summary ?? book.summary,
        url: data.url ?? book.url,
      });

      if (data.authorId) {
        const author = await this.bookRepo.manager.findOne(Author, {
          where: { id: data.authorId },
        });
        if (!author) {
          throw new NotFoundException(
            `Author with id ${data.authorId} not found`,
          );
        }
        book.author = author;
      }

      if (data.genreIds && data.genreIds.length > 0) {
        const genres = await this.bookRepo.manager.find(Genre, {
          where: { id: In(data.genreIds) },
        });
        book.genres = genres;
      }

      const saved = await this.bookRepo.save(book);
      return plainToInstance(BookSerializer, saved, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new BadRequestException(`Invalid update data: ${error.message}`);
    }
  }

  async delete(id: number): Promise<boolean> {
    const book = await this.bookRepo.findOne({
      where: { id },
      relations: ['bookInstances'],
    });
    if (!book) throw new NotFoundException(`Book with id ${id} not found`);

    if (book.bookInstances?.length > 0) {
      throw new BadRequestException(
        'Cannot delete book: it still has associated book instances',
      );
    }

    try {
      await this.bookRepo.softDelete(id);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete book: ${error.message}`,
      );
    }
  }
}

