import { SetMetadata } from '@nestjs/common';
import { UserRole } from '@/common/enums/global.emun';

export const Role = (role: UserRole) => SetMetadata('role', role);
