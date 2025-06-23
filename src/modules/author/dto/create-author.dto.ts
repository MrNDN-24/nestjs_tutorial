import {
    IsString,
    IsDateString,
    IsOptional,
    IsNotEmpty,
    Length,
} from 'class-validator';

export class CreateAuthorDto {
    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    first_name: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 50)
    family_name: string;

    @IsDateString()
    date_of_birth: Date;

    @IsOptional()
    @IsDateString()
    date_of_death?: Date;

    @IsString()
    @IsOptional()
    url?: string;

    @IsString()
    @IsNotEmpty()
    @Length(1, 100)
    name: string;
}

