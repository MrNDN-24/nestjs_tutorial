import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  Body,
  Render,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ResponseData } from '@/common/classes/global-class';
import { HttpStatus, HttpMessage } from '@/common/enums/global.emun';
import { BookSerializer } from './serializers/book.serializer';

@Controller('books')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  // View
  @Get('partial')
  @Render('partials/books/book-list')
  async findAllView() {
    const books = await this.bookService.findAll();
    return { books };
  }

  @Get('partial/:id')
  @Render('partials/books/book-detail')
  async findOneByIdView(@Param('id', ParseIntPipe) id: number) {
    const book = await this.bookService.findOneById(id);
    return { book };
  }
  
  // API
  @Get()
  async findAll(): Promise<ResponseData<BookSerializer[]>> {
    const books = await this.bookService.findAll();
    return new ResponseData<BookSerializer[]>(
      books,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Get(':id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseData<BookSerializer>> {
    const book = await this.bookService.findOneById(id);
    return new ResponseData(book, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  }

  @Post()
  async create(
    @Body() data: CreateBookDto,
  ): Promise<ResponseData<BookSerializer>> {
    const book = await this.bookService.create(data);
    return new ResponseData(book, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  }

  @Put(':id')
  async update(
    @Body() data: UpdateBookDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseData<BookSerializer>> {
    const book = await this.bookService.update(data, id);
    return new ResponseData(book, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseData<boolean>> {
    const result = await this.bookService.delete(id);
    return new ResponseData(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  }
}

