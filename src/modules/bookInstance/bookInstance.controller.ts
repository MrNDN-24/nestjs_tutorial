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
import { BookInstanceService } from './bookInstance.service';
import { ResponseData } from '@/common/classes/global-class';
import { HttpStatus, HttpMessage } from '@/common/enums/global.emun';
import { CreateBookInstanceDto } from './dto/create-bookInstance.dto';
import { UpdateBookInstanceDto } from './dto/update-bookInstance.dto';
import { BookService } from '../book/book.service';
import { BookStatus } from '@/common/enums/global.emun';
import { BookInstanceSerializer } from './serializers/bookInstance.serializer';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from '@/common/enums/global.emun';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('bookInstances')
export class BookInstanceController {
  constructor(
    private readonly bookInstanceService: BookInstanceService,
    private readonly bookService: BookService,
  ) {}

  @Get('partial')
  @Render('partials/bookInstances/bookInstance-list')
  async findAllView() {
    const bookInstances = await this.bookInstanceService.findAll();
    return { bookInstances };
  }

  @Get('partial/:id')
  @Render('partials/bookInstances/bookInstance-detail')
  async findOneByIdView(@Param('id', ParseIntPipe) id: number) {
    const instance = await this.bookInstanceService.findOneById(id);
    return { instance };
  }

  @Role(UserRole.ADMIN)
  @Post('form/add')
  @Render('partials/bookInstances/bookInstance-action')
  async createView(@Body() data: CreateBookInstanceDto) {
    const instance = await this.bookInstanceService.create(data);
    return this.getFormData(instance);
  }

  @Role(UserRole.ADMIN)
  @Get('form/addnew')
  @Render('partials/bookInstances/bookInstance-action')
  async getCreateForm() {
    return this.getFormData();
  }

  @Role(UserRole.ADMIN)
  @Put('form/edit/:id')
  @Render('partials/bookInstances/bookInstance-action')
  async updateView(
    @Body() data: CreateBookInstanceDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const instance = await this.bookInstanceService.update(id, data);
    return this.getFormData(instance);
  }

  @Role(UserRole.ADMIN)
  @Get('form/:id/edit')
  @Render('partials/bookInstances/bookInstance-action')
  async getUpdateForm(@Param('id', ParseIntPipe) id: number) {
    const instance = await this.bookInstanceService.findOneById(id);
    return this.getFormData(instance);
  }

  @Role(UserRole.ADMIN)
  @Delete('delete/:id')
  async deleteView(@Param('id', ParseIntPipe) id: number) {
    await this.bookInstanceService.delete(id);
    return { success: true };
  }

  private async getFormData(instance: any = null) {
    const books = await this.bookService.findAll();
    const statuses = Object.values(BookStatus);
    return { instance, books, statuses };
  }

  // API
  @Get()
  async findAll(): Promise<ResponseData<BookInstanceSerializer[]>> {
    const result = await this.bookInstanceService.findAll();
    return new ResponseData<BookInstanceSerializer[]>(
      result,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Get(':id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseData<BookInstanceSerializer>> {
    const result = await this.bookInstanceService.findOneById(id);
    return new ResponseData(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  }

  @Post()
  async create(
    @Body() data: CreateBookInstanceDto,
  ): Promise<ResponseData<BookInstanceSerializer>> {
    const result = await this.bookInstanceService.create(data);
    return new ResponseData(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateBookInstanceDto,
  ): Promise<ResponseData<BookInstanceSerializer>> {
    const result = await this.bookInstanceService.update(id, data);
    return new ResponseData(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseData<boolean>> {
    const result = await this.bookInstanceService.delete(id);
    return new ResponseData(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  }
}
