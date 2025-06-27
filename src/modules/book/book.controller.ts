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
import { AuthorService } from '../author/author.service';
import { GenreService } from '../genre/genre.service';
import { BookSerializer } from './serializers/book.serializer';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from '@/common/enums/global.emun';
import { ResponseData } from '@/common/classes/global-class';
import { HttpStatus, HttpMessage } from '@/common/enums/global.emun';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('books')
export class BookController {
  constructor(
    private readonly bookService: BookService,
    private readonly authorService: AuthorService,
    private readonly genreService: GenreService,
  ) {}

  private async getBookFormDependencies() {
    const [authors, genres] = await Promise.all([
      this.authorService.findAll(),
      this.genreService.findAll(),
    ]);
    return {
      authors: authors || [],
      genres: genres || [],
    };
  }

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

  @Role(UserRole.ADMIN)
  @Post('form/add')
  @Render('partials/books/book-action')
  async createView(@Body() data: CreateBookDto) {
    const book = await this.bookService.create(data);
    const deps = await this.getBookFormDependencies();
    return { book, ...deps };
  }

  @Role(UserRole.ADMIN)
  @Get('form/addnew')
  @Render('partials/books/book-action')
  async getCreateForm() {
    const deps = await this.getBookFormDependencies();
    return { book: null, ...deps };
  }

  @Role(UserRole.ADMIN)
  @Put('form/edit/:id')
  @Render('partials/books/book-action')
  async updateView(
    @Body() data: CreateBookDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const book = await this.bookService.update(data, id);
    const deps = await this.getBookFormDependencies();
    return { book, ...deps };
  }

  @Role(UserRole.ADMIN)
  @Get('form/:id/edit')
  @Render('partials/books/book-action')
  async getUpdateForm(@Param('id', ParseIntPipe) id: number) {
    const book = await this.bookService.findOneById(id);
    const deps = await this.getBookFormDependencies();
    return { book, ...deps };
  }

  @Role(UserRole.ADMIN)
  @Delete('delete/:id')
  async deleteView(@Param('id', ParseIntPipe) id: number) {
    await this.bookService.delete(id);
    return { success: true };
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

