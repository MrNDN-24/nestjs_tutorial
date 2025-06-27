import { Module, forwardRef } from '@nestjs/common';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Genre } from './entities/genre.entity';
import { BookModule } from '../book/book.module';

@Module({
  imports: [TypeOrmModule.forFeature([Genre]), forwardRef(() => BookModule)],
  controllers: [GenreController],
  providers: [GenreService],
  exports: [GenreService],
})
export class GenreModule {}

