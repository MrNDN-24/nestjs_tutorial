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

@Injectable()
export class GenreService {
  constructor(
    @InjectRepository(Genre)
    private genreRepo: Repository<Genre>,
  ) {}

  async create(genreData: CreateGenreDto): Promise<Genre> {
    try {
      const genre = this.genreRepo.create(genreData);
      return await this.genreRepo.save(genre);
    } catch (error) {
      throw new BadRequestException(`Invalid data: ${error.message}`);
    }
  }

  async findAll(): Promise<Genre[]> {
    try {
      return await this.genreRepo.find({
        relations: ['books'],
        order: {
          name: 'ASC',
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to fetch genres: ${error.message}`,
      );
    }
  }

  async findOneById(id: number): Promise<Genre> {
    const genre = await this.genreRepo.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!genre) {
      throw new NotFoundException(`Genre with id ${id} not found`);
    }
    return genre;
  }

  async update(genreData: UpdateGenreDto, id: number): Promise<Genre> {
    const genre = await this.findOneById(id);
    try {
      const genreUpdated = this.genreRepo.merge(genre, genreData);
      return await this.genreRepo.save(genreUpdated);
    } catch (error) {
      throw new BadRequestException(`Invalid update data: ${error.message}`);
    }
  }

  async delete(id: number): Promise<boolean> {
    const genre = await this.findOneById(id);
    try {
      await this.genreRepo.delete(genre.id);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(
        `Failed to delete genre: ${error.message}`,
      );
    }
  }
}
