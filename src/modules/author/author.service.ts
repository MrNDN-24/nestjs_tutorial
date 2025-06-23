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

@Injectable()
export class AuthorService {
    constructor(
        @InjectRepository(Author)
        private authorRepo: Repository<Author>,
    ) {}

    async create(authorData: CreateAuthorDto): Promise<Author> {
        try {
            const author = this.authorRepo.create(authorData);
            return await this.authorRepo.save(author);
        } catch (error) {
            throw new BadRequestException(
                `Invalid data: ${error.message}`,
            );
        }
    }

    async findAll(): Promise<Author[]> {
        try {
            return await this.authorRepo.find({
                order: {
                    name: 'ASC',
                },
            });
        } catch (error) {
            throw new InternalServerErrorException(
                `Failed to fetch authors: ${error.message}`,
            );
        }
    }

    async findOneById(id: number): Promise<Author> {
        const author = await this.authorRepo.findOneBy({ id });
        if (!author) {
            throw new NotFoundException(`Author with id ${id} not found`);
        }
        return author;
    }

    async update(authorData: UpdateAuthorDto, id: number): Promise<Author> {
        const author = await this.authorRepo.findOneBy({ id });
        if (!author) {
            throw new NotFoundException(`Author with id ${id} not found`);
        }

        try {
            const updatedAuthor = this.authorRepo.merge(author, authorData);
            return await this.authorRepo.save(updatedAuthor);
        } catch (error) {
            throw new BadRequestException(
                `Invalid update data: ${error.message}`,
            );
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

