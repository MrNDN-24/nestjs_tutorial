import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Genre } from './entities/genre.entity';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreSerializer } from './serializers/genre.serializer';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRepo: Repository<Genre>,
  ) {}

  async create(data: CreateGenreDto): Promise<GenreSerializer> {
    try {
      const genre = this.genreRepo.create(data);
      const saved = await this.genreRepo.save(genre);
      return plainToInstance(GenreSerializer, saved, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new BadRequestException(`Invalid data: ${error.message}`);
    }
  }

  async findAll(): Promise<GenreSerializer[]> {
    try {
      const genres = await this.genreRepo.find({
        relations: ['books', 'books.author'],
        order: { name: 'ASC' },
      });
      return plainToInstance(GenreSerializer, genres, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch genres: ${error.message}`,
      );
    }
  }

  async findOneById(id: number): Promise<GenreSerializer> {
    const genre = await this.genreRepo.findOne({
      where: { id },
      relations: ['books', 'books.author'],
    });
    if (!genre) {
      throw new NotFoundException(`Genre with id ${id} not found`);
    }
    return plainToInstance(GenreSerializer, genre, {
      excludeExtraneousValues: true,
    });
  }

  async update(data: UpdateGenreDto, id: number): Promise<GenreSerializer> {
    const genre = await this.genreRepo.findOneBy({ id });
    if (!genre) {
      throw new NotFoundException(`Genre with id ${id} not found`);
    }

    try {
      const updated = this.genreRepo.merge(genre, data);
      const saved = await this.genreRepo.save(updated);
      return plainToInstance(GenreSerializer, saved, {
        excludeExtraneousValues: true,
      });
    } catch (error) {
      throw new BadRequestException(`Invalid update data: ${error.message}`);
    }
  }

  async delete(id: number): Promise<boolean> {
    const genre = await this.genreRepo.findOne({
      where: { id },
      relations: ['books'],
    });

    if (!genre) {
      throw new NotFoundException(`Genre with id ${id} not found`);
    }

    if (genre.books?.length > 0) {
      throw new BadRequestException(
        'Cannot delete genre: it is still associated with books',
      );
    }

    try {
      await this.genreRepo.softDelete(id);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete genre: ${error.message}`,
      );
    }
  }
}
