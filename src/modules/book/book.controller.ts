import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
} from '@nestjs/common';
import { BookService } from './book.service';
import { ResponseData } from '@/common/classes/global-class';
import { Book } from './entities/book.entity';
import { HttpMessage, HttpStatus } from '@/common/enums/global.enum';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  async findAll(): Promise<ResponseData<Book[]>> {
    const books = await this.bookService.findAll();
    return new ResponseData<Book[]>(
      books,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Get(':id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseData<Book>> {
    const book = await this.bookService.findOneById(id);
    return new ResponseData<Book>(
      book,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Post()
  async create(@Body() data: CreateBookDto): Promise<ResponseData<Book>> {
    const book = await this.bookService.create(data);
    return new ResponseData<Book>(
      book,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Put(':id')
  async update(
    @Body() data: UpdateBookDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseData<Book>> {
    const book = await this.bookService.update(data, id);
    return new ResponseData<Book>(
      book,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseData<boolean>> {
    const result = await this.bookService.delete(id);
    return new ResponseData<boolean>(
      result,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }
}
