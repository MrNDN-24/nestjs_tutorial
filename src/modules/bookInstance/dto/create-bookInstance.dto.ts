import { IsString, IsDateString, IsNotEmpty, IsInt, IsUrl, IsOptional } from 'class-validator';

export class CreateBookInstanceDto {
  @IsString()
  @IsNotEmpty()
  imprint: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsDateString()
  due_back: Date;

  @IsString()
  @IsUrl()
  @IsOptional()
  url?: string;

  @IsInt()
  @IsNotEmpty()
  bookId: number;
}
