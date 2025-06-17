import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { AuthorModule } from './modules/author/author.module';
import { GenreModule } from './modules/genre/genre.module';
@Module({
    imports: [
    TypeOrmModule.forRoot({
      ...AppDataSource.options, 
    }),
    AuthorModule,
    GenreModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
}

