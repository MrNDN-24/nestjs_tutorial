import { Expose, Type } from 'class-transformer';
import { BookSerializer } from '@/modules/book/serializers/book.serializer';

export class GenreSerializer {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  url: string;

  @Expose()
  @Type(() => BookSerializer) 
  books?: BookSerializer[];
}
