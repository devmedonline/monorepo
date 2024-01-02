import { Permission, User } from '@prisma/client';

export type UserWithPermissions = Omit<User, 'password'> & {
  permissions: Permission[];
};
