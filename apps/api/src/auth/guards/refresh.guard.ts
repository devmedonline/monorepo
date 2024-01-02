import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
  UnauthorizedException,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Ban } from 'src/ban/entities/ban.entity';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { JWTPayload } from '../entities/jwt-payload.entity';

@Injectable()
export class RefreshJwtGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = JWTPayload.extractRefreshTokenFromRequest(request);
    console.log('refresh guard', token);

    if (!token) throw new UnauthorizedException();

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_REFRESH_TOKEN_KEY,
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

      if (!user.verified) throw new UnauthorizedException('Not verified');

      const lastBan = user.bans.at(-1);

      const isBanned = Ban.stillBanned(lastBan);

      if (isBanned) throw new UnauthorizedException("You're banned");

      request.user = {
        ...UserService.toUser(user),
        permissions: user.permissions,
      };

      return Boolean(user);
    } catch (err) {
      if (err instanceof HttpException) {
        throw err;
      }

      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException();
      }

      throw new BadRequestException();
    }
  }
}

export const CheckRefreshJWT = () => {
  return applyDecorators(UseGuards(RefreshJwtGuard));
};
