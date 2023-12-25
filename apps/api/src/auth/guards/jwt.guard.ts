import {
  applyDecorators,
  BadRequestException,
  CanActivate,
  createParamDecorator,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Ban } from 'src/ban/entities/ban.entity';
import { PrismaService } from 'src/prisma.service';
import { UserWithPermissions } from 'src/user/dto/user-with-permissions.dto';
import { JWTPayload } from '../entities/jwt-payload.entity';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = JWTPayload.extractTokenFromRequest(request);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET_KEY,
      });

      if (!JWTPayload.isJWTPayload(payload)) throw new UnauthorizedException();

      const user = await this.prismaService.user.findUnique({
        where: { id: payload.id },
        include: {
          permissions: true,
          bans: true,
        },
      });

      if (!user) throw new UnauthorizedException();

      const lastBan = user.bans.at(-1);

      const isBanned = Ban.stillBanned(lastBan);

      if (isBanned) throw new UnauthorizedException("You're banned");

      request.user = user;

      return Boolean(user);
    } catch (err) {
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException();
      }

      throw new BadRequestException();
    }
  }
}

export const CheckJWT = () => {
  return applyDecorators(UseGuards(JwtGuard));
};

export const User = createParamDecorator(
  (_: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as UserWithPermissions;
  },
);
