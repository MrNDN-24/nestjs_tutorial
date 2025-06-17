import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { AuthorModule } from './modules/author/author.module';
@Module({
    imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options, 
    }),
    AuthorModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}


