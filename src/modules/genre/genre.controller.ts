import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Delete,
  ParseIntPipe,
  Param,
  Render,
} from '@nestjs/common';
import { CreateGenreDto } from './dto/create-genre.dto';
import { UpdateGenreDto } from './dto/update-genre.dto';
import { GenreSerializer } from './serializers/genre.serializer';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Role } from '../auth/role.decorator';
import { UserRole } from '@/common/enums/global.emun';
import { ResponseData } from '@/common/classes/global-class';
import { HttpStatus, HttpMessage } from '@/common/enums/global.emun';
import { GenreService } from './genre.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  // View
  @Get('partial')
  @Render('partials/genres/genre-list')
  async findAllView() {
    const genres = await this.genreService.findAll();
    return { genres };
  }

  @Get('partial/:id')
  @Render('partials/genres/genre-detail')
  async findOneByIdView(@Param('id', ParseIntPipe) id: number) {
    const genre = await this.genreService.findOneById(id);
    return { genre };
  }

  @Role(UserRole.ADMIN)
  @Post('form/add')
  @Render('partials/genres/genre-action')
  async createView(@Body() data: CreateGenreDto) {
    const genre = await this.genreService.create(data);
    return { genre };
  }

  @Role(UserRole.ADMIN)
  @Get('form/addnew')
  @Render('partials/genres/genre-action')
  getCreateForm() {
    return { genre: null };
  }

  @Role(UserRole.ADMIN)
  @Put('form/edit/:id')
  @Render('partials/genres/genre-action')
  async updateView(
    @Body() data: CreateGenreDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    const genre = await this.genreService.update(data, id);
    return { genre };
  }

  @Role(UserRole.ADMIN)
  @Get('form/:id/edit')
  @Render('partials/genres/genre-action')
  async getUpdateForm(@Param('id', ParseIntPipe) id: number) {
    const genre = await this.genreService.findOneById(id);
    return { genre };
  }

  @Role(UserRole.ADMIN)
  @Delete('delete/:id')
  async deleteView(@Param('id', ParseIntPipe) id: number) {
    await this.genreService.delete(id);
    return { success: true };
  }

  // API
  @Post()
  async create(
    @Body() data: CreateGenreDto,
  ): Promise<ResponseData<GenreSerializer>> {
    const genre = await this.genreService.create(data);
    return new ResponseData(genre, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  }

  @Get()
  async findAll(): Promise<ResponseData<GenreSerializer[]>> {
    const genres = await this.genreService.findAll();
    return new ResponseData<GenreSerializer[]>(
      genres,
      HttpStatus.SUCCESS,
      HttpMessage.SUCCESS,
    );
  }

  @Get(':id')
  async findOneById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<ResponseData<GenreSerializer>> {
    const genre = await this.genreService.findOneById(id);
    return new ResponseData(genre, HttpStatus.SUCCESS, HttpMessage.SUCCESS);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: UpdateGenreDto,
  ): Promise<ResponseData<GenreSerializer>> {
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

