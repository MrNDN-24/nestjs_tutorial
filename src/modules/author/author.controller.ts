import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  ParseIntPipe,
  Put,
  Delete,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-autor.dto';
import { ResponseData } from '@/common/classes/global-class';
import { Author } from './entities/author.entity';
import { HttpMessage, HttpStatus } from '@/common/enums/global.enum';

@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  @Post()
  async create(@Body() data: CreateAuthorDto): Promise<ResponseData<Author>> {
    const author = await this.authorService.create(data);
    return new ResponseData(author, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  }

  @Get()
  async findAll(): Promise<ResponseData<Author[]>> {
    const authors = await this.authorService.findAll();
    return new ResponseData<Author[]>(
      authors,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Get(':id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseData<Author>> {
    const author = await this.authorService.findOneById(id);
    return new ResponseData(author, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  }

  @Put(':id')
  async update(
    @Body() data: UpdateAuthorDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseData<Author>> {
    const author = await this.authorService.update(data, id);
    return new ResponseData(author, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseData<boolean>> {
    const result = await this.authorService.delete(id);
    return new ResponseData(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  }
}

