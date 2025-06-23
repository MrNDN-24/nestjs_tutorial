import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateBookInstanceDto } from './create-bookInstance.dto';

export class UpdateBookInstanceDto extends PartialType(
  OmitType(CreateBookInstanceDto, ['bookId'] as const),
) {}
