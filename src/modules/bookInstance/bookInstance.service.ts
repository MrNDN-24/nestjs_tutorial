import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookInstance } from './entities/bookInstance.entity';
import { CreateBookInstanceDto } from './dto/create-bookInstance.dto';
import { UpdateBookInstanceDto } from './dto/update-bookInstance.dto';
import { Book } from '../book/entities/book.entity';

@Injectable()
export class BookInstanceService {
  constructor(
    @InjectRepository(BookInstance)
    private bookInstanceRepo: Repository<BookInstance>,
  ) {}

  async findAll(): Promise<BookInstance[]> {
    try {
      return await this.bookInstanceRepo.find({
        relations: ['book'],
        order: {
          id: 'DESC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch book instances: ${error.message}`,
      );
    }
  }

  async findOneById(id: number): Promise<BookInstance> {
    const bookInstance = await this.bookInstanceRepo.findOne({
      where: { id },
      relations: ['book'],
    });
    if (!bookInstance) {
      throw new NotFoundException(`BookInstance with id ${id} not found`);
    }
    return bookInstance;
  }

  async create(createDto: CreateBookInstanceDto): Promise<BookInstance> {
    try {
      const book = await this.bookInstanceRepo.manager.findOne(Book, {
        where: { id: createDto.bookId },
      });

      if (!book) {
        throw new NotFoundException(
          `Book with id ${createDto.bookId} not found`,
        );
      }

      const bookInstance = this.bookInstanceRepo.create({
        ...createDto,
        book,
      });

      return await this.bookInstanceRepo.save(bookInstance);
    } catch (error) {
      throw new BadRequestException(
        `Invalid data for book instance creation: ${error.message}`,
      );
    }
  }

  async update(
    id: number,
    updateDto: UpdateBookInstanceDto,
  ): Promise<BookInstance> {
    const bookInstance = await this.findOneById(id);
    try {
      Object.assign(bookInstance, {
        imprint: updateDto.imprint ?? bookInstance.imprint,
        status: updateDto.status ?? bookInstance.status,
        due_back: updateDto.due_back ?? bookInstance.due_back,
        url: updateDto.url ?? bookInstance.url,
      });

      return await this.bookInstanceRepo.save(bookInstance);
    } catch (error) {
      throw new BadRequestException(
        `Invalid data for update: ${error.message}`,
      );
    }
  }

  async delete(id: number): Promise<boolean> {
    const bookInstance = await this.findOneById(id);
    try {
      await this.bookInstanceRepo.delete(bookInstance.id);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete book instance: ${error.message}`,
      );
    }
  }
}
