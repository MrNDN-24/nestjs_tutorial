import {
  IsNotEmpty,
  IsString,
  IsISBN,
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

  @IsNotEmpty()
  @IsISBN()
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
