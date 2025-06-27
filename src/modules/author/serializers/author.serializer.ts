import { Expose, Type } from 'class-transformer';
import { BookSerializer } from '@/modules/book/serializers/book.serializer';

export class AuthorSerializer {
  @Expose()
  id: number;

  @Expose()
  first_name: string;

  @Expose()
  family_name: string;

  @Expose()
  date_of_birth: string | null;

  @Expose()
  date_of_death: string | null;

  @Expose()
  url?: string;

  @Expose()
  name: string;

  @Expose()
  @Type(() => BookSerializer)
  books?: BookSerializer[];
}
