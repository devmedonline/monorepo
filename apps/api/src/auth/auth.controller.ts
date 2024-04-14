import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { BasicResponseWrapper } from 'src/common/entities/basic-response-wrapper.entity';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserWithPermissions } from 'src/user/dto/user-with-permissions.dto';
import { UserService } from 'src/user/user.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { User } from './guards/jwt.guard';
import { CheckRefreshJWT } from './guards/refresh.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  /**
   * Registers a new user but does not log them in.
   */
  @Post('register')
  async registerUser(@Body() registerUserDto: CreateUserDto) {
    const user = await this.userService.create(registerUserDto);
    return new BasicResponseWrapper({ data: user });
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.login(dto);

    this.setCookies(response, user.backendTokens);

    return new BasicResponseWrapper({
      data: user,
    });
  }

  @Post('refresh')
  @CheckRefreshJWT()
  async refreshToken(
    @User() user: UserWithPermissions,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refresh = await this.authService.refreshToken(user);

    this.setCookies(response, refresh);

    return new BasicResponseWrapper({
      data: refresh,
    });
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(process.env.JWT_REFRESH_COOKIE_NAME);
    response.clearCookie(process.env.JWT_COOKIE_NAME);

    return new BasicResponseWrapper({
      data: 'Saiu com sucesso!',
    });
  }

  private setCookies(
    response: Response,
    tokens: { accessToken: string; refreshToken: string },
  ) {
    response.cookie(process.env.JWT_COOKIE_NAME, tokens.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 20, // 20 minutes
    });

    response.cookie(process.env.JWT_REFRESH_COOKIE_NAME, tokens.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
  }
}
