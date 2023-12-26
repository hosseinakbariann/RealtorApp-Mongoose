import { UserType } from '../../enums/userType';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles:UserType[])=> SetMetadata('roles',roles);