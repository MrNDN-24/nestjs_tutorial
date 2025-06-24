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
import { BookInstanceService } from './bookInstance.service';
import { ResponseData } from '@/common/classes/global-class';
import { BookInstance } from './entities/bookInstance.entity';
import { HttpStatus, HttpMessage } from '@/common/enums/global.enum';
import { CreateBookInstanceDto } from './dto/create-bookInstance.dto';

@Controller('bookInstances')
export class BookInstanceController {
  constructor(private readonly bookInstanceService: BookInstanceService) {}

  @Get()
  async findAll(): Promise<ResponseData<BookInstance[]>> {
    const bookInstances = await this.bookInstanceService.findAll();
    return new ResponseData<BookInstance[]>(
      bookInstances,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Get(':id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseData<BookInstance>> {
    const bookInstance = await this.bookInstanceService.findOneById(id);
    return new ResponseData<BookInstance>(
      bookInstance,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Post()
  async create(
    @Body() data: CreateBookInstanceDto,
  ): Promise<ResponseData<BookInstance>> {
    const bookInstance = await this.bookInstanceService.create(data);
    return new ResponseData<BookInstance>(
      bookInstance,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Put(':id')
  async update(
    @Body() data: CreateBookInstanceDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseData<BookInstance>> {
    const bookInstance = await this.bookInstanceService.update(id, data);
    return new ResponseData<BookInstance>(
      bookInstance,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Delete(':id')
  async delete(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseData<boolean>> {
    const result = await this.bookInstanceService.delete(id);
    return new ResponseData(result, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  }
}
