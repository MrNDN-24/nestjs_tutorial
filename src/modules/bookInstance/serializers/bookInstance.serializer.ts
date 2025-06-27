import { Expose, Type } from 'class-transformer';
import { BookSerializer } from '@/modules/book/serializers/book.serializer';

export class BookInstanceSerializer {
  @Expose()
  id: number;

  @Expose()
  imprint: string;

  @Expose()
  status: string;

  @Expose()
  due_back: Date;

  @Expose()
  url: string;

  @Expose()
  @Type(() => BookSerializer)
  book: BookSerializer;
}
