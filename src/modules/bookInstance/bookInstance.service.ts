import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookInstance } from './entities/bookInstance.entity';
import { Book } from '../book/entities/book.entity';
import { CreateBookInstanceDto } from './dto/create-bookInstance.dto';
import { UpdateBookInstanceDto } from './dto/update-bookInstance.dto';
import { BookInstanceSerializer } from './serializers/bookInstance.serializer';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class BookInstanceService {
  constructor(
    @InjectRepository(BookInstance)
    private bookInstanceRepo: Repository<BookInstance>,
  ) {}

  async findAll(): Promise<BookInstanceSerializer[]> {
    try {
      const instances = await this.bookInstanceRepo.find({
        relations: ['book'],
        order: { id: 'DESC' },
      });
      return plainToInstance(BookInstanceSerializer, instances, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch book instances: ${error.message}`,
      );
    }
  }

  async findOneById(id: number): Promise<BookInstanceSerializer> {
    try {
      const instance = await this.bookInstanceRepo.findOne({
        where: { id },
        relations: ['book'],
      });
      if (!instance) {
        throw new NotFoundException(`BookInstance with id ${id} not found`);
      }
      return plainToInstance(BookInstanceSerializer, instance, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch book instance: ${error.message}`,
      );
    }
  }

  async create(data: CreateBookInstanceDto): Promise<BookInstanceSerializer> {
    try {
      const book = await this.bookInstanceRepo.manager.findOne(Book, {
        where: { id: data.bookId },
      });
      if (!book) {
        throw new NotFoundException(`Book with id ${data.bookId} not found`);
      }

      const newInstance = this.bookInstanceRepo.create({ ...data, book });
      const saved = await this.bookInstanceRepo.save(newInstance);
      return plainToInstance(BookInstanceSerializer, saved, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new BadRequestException(
        `Invalid data for book instance creation: ${error.message}`,
      );
    }
  }

  async update(
    id: number,
    data: UpdateBookInstanceDto,
  ): Promise<BookInstanceSerializer> {
    const instance = await this.bookInstanceRepo.findOne({
      where: { id },
      relations: ['book'],
    });
    if (!instance) {
      throw new NotFoundException(`BookInstance with id ${id} not found`);
    }

    try {
      Object.assign(instance, {
        imprint: data.imprint ?? instance.imprint,
        status: data.status ?? instance.status,
        due_back: data.due_back ?? instance.due_back,
        url: data.url ?? instance.url,
      });

      const saved = await this.bookInstanceRepo.save(instance);
      return plainToInstance(BookInstanceSerializer, saved, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new BadRequestException(`Invalid update data: ${error.message}`);
    }
  }

  async delete(id: number): Promise<boolean> {
    const instance = await this.bookInstanceRepo.findOneBy({ id });
    if (!instance) {
      throw new NotFoundException(`BookInstance with id ${id} not found`);
    }

    try {
      await this.bookInstanceRepo.delete(id);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete book instance: ${error.message}`,
      );
    }
  }
}

