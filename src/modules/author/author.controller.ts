import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  Render,
} from '@nestjs/common';
import { AuthorService } from './author.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-autor.dto';
import { ResponseData } from '@/common/classes/global-class';
import { HttpMessage, HttpStatus } from '@/common/enums/global.emun';
import { AuthorSerializer } from './serializers/author.serializer';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from '@/common/enums/global.emun';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('authors')
export class AuthorController {
  constructor(private readonly authorService: AuthorService) {}

  // View
  @Get('partial')
  @Render('partials/authors/author-list')
  async findAllView() {
    const authors = await this.authorService.findAll();
    return { authors };
  }

  @Get('partial/:id')
  @Render('partials/authors/author-detail')
  async findOneByIdView(@Param('id', ParseIntPipe) id: number) {
    const author = await this.authorService.findOneById(id);
    return { author };
  }

  @Role(UserRole.ADMIN)
  @Post('form/add')
  @Render('partials/authors/author-action')
  async createView(@Body() data: CreateAuthorDto) {
    const author = await this.authorService.create(data);
    return { author };
  }

  @Role(UserRole.ADMIN)
  @Get('form/addnew')
  @Render('partials/authors/author-action')
  getCreateForm() {
    return { author: null };
  }

  @Role(UserRole.ADMIN)
  @Put('form/edit/:id')
  @Render('partials/authors/author-action')
  async updateView(
    @Body() data: CreateAuthorDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const author = await this.authorService.update(data, id);
    return { author };
  }

  @Role(UserRole.ADMIN)
  @Get('form/:id/edit')
  @Render('partials/authors/author-action')
  async getUpdateForm(@Param('id', ParseIntPipe) id: number) {
    const author = await this.authorService.findOneById(id);
    return { author };
  }

  @Role(UserRole.ADMIN)
  @Delete('delete/:id')
  async deleteView(@Param('id', ParseIntPipe) id: number) {
    await this.authorService.delete(id);
    return { success: true };
  }

  // API
  @Post()
  async create(
    @Body() data: CreateAuthorDto,
  ): Promise<ResponseData<AuthorSerializer>> {
    const author = await this.authorService.create(data);
    return new ResponseData(author, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  }

  @Get()
  async findAll(): Promise<ResponseData<AuthorSerializer[]>> {
    const authors = await this.authorService.findAll();
    return new ResponseData<AuthorSerializer[]>(
      authors,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Get(':id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseData<AuthorSerializer>> {
    const author = await this.authorService.findOneById(id);
    return new ResponseData(author, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  }

  @Put(':id')
  async update(
    @Body() data: UpdateAuthorDto,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseData<AuthorSerializer>> {
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
