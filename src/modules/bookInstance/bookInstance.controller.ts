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
import { BookInstanceSerializer } from './serializers/bookInstance.serializer';

@Controller('bookInstances')
export class BookInstanceController {
  constructor(private readonly bookInstanceService: BookInstanceService) {}

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

