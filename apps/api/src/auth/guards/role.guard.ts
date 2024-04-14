import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Permission } from 'db';
import { UserWithPermissions } from 'src/user/dto/user-with-permissions.dto';
import { PERMISSION } from '../constants/permissions';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const roles = this.reflector.get<PERMISSION[]>(
      CheckRole,
      context.getHandler(),
    );
    if (!roles) return true;

    const user = request.user as UserWithPermissions;
    if (!user) return false;

    return this.matchRoles(roles, user.permissions);
  }

  private matchRoles(roles: PERMISSION[], userRoles: Permission[]) {
    return roles.some((role) =>
      userRoles.find((userRole) => userRole.name === role),
    );
  }
}

export const CheckRole = Reflector.createDecorator<PERMISSION[]>();
