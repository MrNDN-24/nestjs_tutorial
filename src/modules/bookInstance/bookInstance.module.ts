import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookInstance } from './entities/bookInstance.entity';
import { BookInstanceController } from './bookInstance.controller';
import { BookInstanceService } from './bookInstance.service';
import { Book } from '../book/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([BookInstance, Book])],
  controllers: [BookInstanceController],
  providers: [BookInstanceService],
})
export class BookInstanceModule {}
