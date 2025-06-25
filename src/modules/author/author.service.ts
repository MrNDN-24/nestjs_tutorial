import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-autor.dto';
import { AuthorSerializer } from './serializers/author.serializer';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthorService {
  constructor(
    @InjectRepository(Author)
    private authorRepo: Repository<Author>,
  ) {}

  async create(data: CreateAuthorDto): Promise<AuthorSerializer> {
    try {
      const author = this.authorRepo.create(data);
      const saved = await this.authorRepo.save(author);
      return plainToInstance(AuthorSerializer, saved, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new BadRequestException(`Invalid data: ${error.message}`);
    }
  }

  async findAll(): Promise<AuthorSerializer[]> {
    try {
      const authors = await this.authorRepo.find({
        relations: ['books'],
        order: { name: 'ASC' },
      });
      return plainToInstance(AuthorSerializer, authors, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch authors: ${error.message}`,
      );
    }
  }

  async findOneById(id: number): Promise<AuthorSerializer> {
    try {
      const author = await this.authorRepo.findOne({
        where: { id },
        relations: ['books'],
      });
      if (!author) {
        throw new NotFoundException(`Author with id ${id} not found`);
      }
      return plainToInstance(AuthorSerializer, author, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch author: ${error.message}`,
      );
    }
  }

  async update(data: UpdateAuthorDto, id: number): Promise<AuthorSerializer> {
    const author = await this.authorRepo.findOneBy({ id });
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }

    try {
      const updated = this.authorRepo.merge(author, data);
      const saved = await this.authorRepo.save(updated);
      return plainToInstance(AuthorSerializer, saved, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new BadRequestException(`Invalid update data: ${error.message}`);
    }
  }

  async delete(id: number): Promise<boolean> {
    const author = await this.authorRepo.findOneBy({ id });
    if (!author) {
      throw new NotFoundException(`Author with id ${id} not found`);
    }

    try {
      await this.authorRepo.delete(id);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete author: ${error.message}`,
      );
    }
  }
}

