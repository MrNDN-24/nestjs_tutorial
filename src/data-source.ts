import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { Book } from './modules/book/entities/book.entity';
import { BookInstance } from './modules/bookInstance/entities/bookInstance.enity';
import { Genre } from './modules/genre/entities/genre.entity';
import { Author } from './modules/author/entities/author.entity';
config();

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306'),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Book, BookInstance, Genre, Author],
  migrations: ['dist/migrations/*.js'], 
  synchronize: false,
});
