import { IsString, IsDateString, IsNotEmpty, IsInt, IsUrl, IsOptional, IsEnum } from 'class-validator';
import { BookStatus } from '@/common/enums/global.emun';

export class CreateBookInstanceDto {
  @IsString()
  @IsNotEmpty()
  imprint: string;

  @IsEnum(BookStatus)
  status: BookStatus;

  @IsDateString()
  due_back: string;

  @IsString()
  @IsUrl()
  @IsOptional()
  url?: string;

  @IsInt()
  @IsNotEmpty()
  bookId: number;
}
