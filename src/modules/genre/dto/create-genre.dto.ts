import { IsString, IsNotEmpty, Length, IsOptional } from 'class-validator';

export class CreateGenreDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    name: string;

    @IsString()
    @IsOptional()
    @Length(0, 255)
    url?: string;
}
