import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  UseGuards,
  applyDecorators,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
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
        },
      });

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

export const CheckRefreshJWT = () => {
  return applyDecorators(UseGuards(RefreshJwtGuard));
};
