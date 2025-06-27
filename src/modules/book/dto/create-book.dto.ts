import {
  IsNotEmpty,
  IsString,
  IsUrl,
  IsArray,
  IsNumber,
  IsOptional,
} from 'class-validator';
export class CreateBookDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  summary: string;

  @IsString()
  isbn: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  url?: string;

  @IsNotEmpty()
  @IsNumber()
  authorId: number;

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  genreIds?: number[];
}
