import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserWithPermissions } from 'src/user/dto/user-with-permissions.dto';
import { EmailVerificationService } from 'src/user/email-verification.service';
import { UserService } from 'src/user/user.service';
import { Crypto } from './crypto';
import { LoginDto } from './dto/auth.dto';
import { JWTPayload } from './entities/jwt-payload.entity';

const EXPIRE_TIME = 20 * 1000 * 60;

const ACCESS_TOKEN_EXPIRES_IN = '20m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private crypto: Crypto,
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  async login(dto: LoginDto) {
    const user = await this.validateUser(dto);

    if (user.verified === false) {
      await this.emailVerificationService.triggerEmailVerification(user.email);
    }

    const payload = new JWTPayload(user.id, {
      name: user.name,
      iat: Date.now(),
      exp: Date.now() + EXPIRE_TIME,
    }).toPlainObject();

    return {
      user,
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: ACCESS_TOKEN_EXPIRES_IN,
          secret: process.env.JWT_SECRET_KEY,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: REFRESH_TOKEN_EXPIRES_IN,
          secret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }

  async validateUser(dto: LoginDto) {
    const user = await this.userService.findByEmail(dto.email);

    const passwordIsValid = await this.crypto.compare(
      dto.password,
      user.password,
    );

    if (user && passwordIsValid) {
      return UserService.toUser(user);
    }

    throw new UnauthorizedException();
  }

  async refreshToken(user: UserWithPermissions) {
    const payload = new JWTPayload(user.id, {
      name: user.name,
      iat: Date.now(),
      exp: Date.now() + EXPIRE_TIME,
    }).toPlainObject();

    return {
      backendTokens: {
        accessToken: await this.jwtService.signAsync(payload, {
          expiresIn: ACCESS_TOKEN_EXPIRES_IN,
          secret: process.env.JWT_SECRET_KEY,
        }),
        refreshToken: await this.jwtService.signAsync(payload, {
          expiresIn: REFRESH_TOKEN_EXPIRES_IN,
          secret: process.env.JWT_REFRESH_TOKEN_SECRET_KEY,
        }),
        expiresIn: new Date().setTime(new Date().getTime() + EXPIRE_TIME),
      },
    };
  }
}
