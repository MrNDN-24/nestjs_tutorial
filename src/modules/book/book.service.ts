import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { Author } from '../author/entities/author.entity';
import { Genre } from '../genre/entities/genre.entity';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(@InjectRepository(Book) private bookRepo: Repository<Book>) {}

  async findAll(): Promise<Book[]> {
    try {
      return await this.bookRepo.find({
        relations: ['author', 'bookInstances', 'genres'],
        order: {
          title: 'ASC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch books: ${error.message}`,
      );
    }
  }

  async findOneById(id: number): Promise<Book> {
    const book = await this.bookRepo.findOne({
      where: { id },
      relations: ['author', 'genres', 'bookInstances'],
    });
    if (!book) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
    return book;
  }

  async create(createDto: CreateBookDto): Promise<Book> {
    try {
      const author = await this.bookRepo.manager.findOne(Author, {
        where: { id: createDto.authorId },
      });
      if (!author) {
        throw new NotFoundException(
          `Author with id ${createDto.authorId} not found`,
        );
      }

      const genres = await this.bookRepo.manager.find(Genre, {
        where: { id: In(createDto.genreIds ?? []) },
      });

      const book = this.bookRepo.create({ ...createDto, author, genres });
      return await this.bookRepo.save(book);
    } catch (error) {
      throw new BadRequestException(
        `Invalid data for book creation: ${error.message}`,
      );
    }
  }

  async update(updateDto: UpdateBookDto, id: number): Promise<Book> {
    const book = await this.findOneById(id);
    try {
      Object.assign(book, {
        title: updateDto.title ?? book.title,
        summary: updateDto.summary ?? book.summary,
        url: updateDto.url ?? book.url,
      });

      if (updateDto.authorId) {
        const author = await this.bookRepo.manager.findOne(Author, {
          where: { id: updateDto.authorId },
        });
        if (!author) {
          throw new NotFoundException(
            `Author with id ${updateDto.authorId} not found`,
          );
        }
        book.author = author;
      }

      if (updateDto.genreIds && updateDto.genreIds.length > 0) {
        const genres = await this.bookRepo.manager.find(Genre, {
          where: { id: In(updateDto.genreIds) },
        });
        book.genres = genres;
      }

      return await this.bookRepo.save(book);
    } catch (error) {
      throw new BadRequestException(`Invalid update data: ${error.message}`);
    }
  }

  async delete(id: number): Promise<boolean> {
    const book = await this.findOneById(id);
    try {
      await this.bookRepo.delete(book.id);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete book: ${error.message}`,
      );
    }
  }
}
