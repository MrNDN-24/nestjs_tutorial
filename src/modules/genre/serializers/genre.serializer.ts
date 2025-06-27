import { Expose } from 'class-transformer';

export class GenreSerializer {
  @Expose()
  id: number;

  @Expose()
  name: string;

  @Expose()
  url: string;
}
