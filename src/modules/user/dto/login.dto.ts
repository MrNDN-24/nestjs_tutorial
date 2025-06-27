import { IsString, IsNotEmpty } from 'class-validator';
import { ValidationMessage } from '@/common/enums/validation-message.enum';

export class LoginDto {
  @IsString({ message: ValidationMessage.LOGIN_USERNAME_REQUIRED })
  @IsNotEmpty({ message: ValidationMessage.LOGIN_USERNAME_REQUIRED })
  username: string;

  @IsString({ message: ValidationMessage.LOGIN_PASSWORD_REQUIRED })
  @IsNotEmpty({ message: ValidationMessage.LOGIN_PASSWORD_REQUIRED })
  password: string;
}
