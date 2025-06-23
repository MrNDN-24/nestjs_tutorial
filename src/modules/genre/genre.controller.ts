import {
    Body,
    Controller,
    Post,
    Get,
    Put,
    Delete,
    ParseIntPipe,
    Param,
} from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { ResponseData } from '@/global/globalClass';
import { GenreService } from './genre.service';
import { Genre } from './entities/genre.entity';
import { HttpMessage, HttpStatus } from '@/global/globalEmun';
import { UpdateGenreDto } from './dto/update-genre.dto';

@Controller('genres')
export class GenreController {
    constructor(private readonly genreService: GenreService) {}

    @Post()
    async create(@Body() data: CreateGenreDto): Promise<ResponseData<Genre>> {
        const genre = await this.genreService.create(data);
        return new ResponseData(genre, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    }

    @Get()
    async findAll(): Promise<ResponseData<Genre[]>> {
        const genres = await this.genreService.findAll();
        return new ResponseData<Genre[]>(genres, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    }

    @Get(':id')
    async findOneById(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseData<Genre>> {
        const genre = await this.genreService.findOneById(id);
        return new ResponseData(genre, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    }

    @Put(':id')
    async update(
        @Body() data: UpdateGenreDto,
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseData<Genre>> {
        const genre = await this.genreService.update(data, id);
        return new ResponseData(genre, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    }

    @Delete(':id')
    async delete(
        @Param('id', ParseIntPipe) id: number,
    ): Promise<ResponseData<boolean>> {
        const result = await this.genreService.delete(id);
        return new ResponseData(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
    }
}

