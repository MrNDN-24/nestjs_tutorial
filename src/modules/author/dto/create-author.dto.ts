import {
  IsString,
  IsDateString,
  IsOptional,
  IsNotEmpty,
  Length,
  IsUrl,
} from 'class-validator';
import {
  FIRST_NAME_MIN_LENGTH,
  FIRST_NAME_MAX_LENGTH,
  FAMILY_NAME_MIN_LENGTH,
  FAMILY_NAME_MAX_LENGTH,
  NAME_MIN_LENGTH,
  NAME_MAX_LENGTH,
} from 'src/common/constants/validation.constant';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  @Length(FIRST_NAME_MIN_LENGTH, FIRST_NAME_MAX_LENGTH)
  first_name: string;

  @IsString()
  @IsNotEmpty()
  @Length(FAMILY_NAME_MIN_LENGTH, FAMILY_NAME_MAX_LENGTH)
  family_name: string;

  @IsDateString()
  date_of_birth: string;

  @IsOptional()
  @IsDateString()
  date_of_death?: string;

  @IsString()
  @IsOptional()
  @IsUrl()
  url?: string;

  @IsString()
  @IsNotEmpty()
  @Length(NAME_MIN_LENGTH, NAME_MAX_LENGTH)
  name: string;
}
