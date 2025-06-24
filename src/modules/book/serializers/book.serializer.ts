import { Expose, Type } from 'class-transformer';
import { AuthorSerializer } from '@/modules/author/serializers/author.serializer';
import { GenreSerializer } from '@/modules/genre/serializers/genre.serializer';
import { BookInstanceSerializer } from '@/modules/bookInstance/serializers/bookInstance.serializer';

export class BookSerializer {
  @Expose()
  id: number;

  @Expose()
  title: string;

  @Expose()
  summary: string;

  @Expose()
  isbn: string;

  @Expose()
  url?: string;

  @Expose()
  @Type(() => AuthorSerializer)
  author: AuthorSerializer;

  @Expose()
  @Type(() => GenreSerializer)
  genres?: GenreSerializer[];

  @Expose()
  @Type(() => BookInstanceSerializer)
  bookInstances?: BookInstanceSerializer[];
}

