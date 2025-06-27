import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookInstance } from './entities/bookInstance.entity';
import { BookInstanceController } from './bookInstance.controller';
import { BookInstanceService } from './bookInstance.service';
import { BookModule } from '../book/book.module';

@Module({
  imports: [TypeOrmModule.forFeature([BookInstance]), BookModule],
  controllers: [BookInstanceController],
  providers: [BookInstanceService],
  exports: [BookInstanceService]
})
export class BookInstanceModule {}
