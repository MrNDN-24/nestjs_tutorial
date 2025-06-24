import { IsString, IsNotEmpty, Length, IsOptional , IsUrl} from 'class-validator';
import {
  GENRE_NAME_MIN_LENGTH,
  GENRE_NAME_MAX_LENGTH,
} from 'src/common/constants/validation.constant';

export class CreateGenreDto {
  @IsString()
  @IsNotEmpty()
  @Length(GENRE_NAME_MIN_LENGTH, GENRE_NAME_MAX_LENGTH)
  name: string;

  @IsNotEmpty()
  @IsUrl()
  @IsOptional()
  url?: string;
}
