import { Body, Controller, Post, Res } from '@nestjs/common';
import { Response } from 'express';
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

  @Post('register')
  async registerUser(@Body() registerUserDto: CreateUserDto) {
    return this.userService.create(registerUserDto);
  }

  @Post('login')
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    const user = await this.authService.login(dto);

    response.cookie(
      process.env.JWT_REFRESH_COOKIE_NAME,
      user.backendTokens.refreshToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    );

    response.cookie(
      process.env.JWT_COOKIE_NAME,
      user.backendTokens.accessToken,
      {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 20, // 20 minutes
      },
    );

    return user;
  }

  @Post('refresh')
  @CheckRefreshJWT()
  async refreshToken(
    @User() user: UserWithPermissions,
    @Res({ passthrough: true }) response: Response,
  ) {
    const refresh = await this.authService.refreshToken(user);

    response.cookie(process.env.JWT_REFRESH_COOKIE_NAME, refresh.refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });

    response.cookie(process.env.JWT_COOKIE_NAME, refresh.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 1000 * 60 * 20, // 20 minutes
    });

    return refresh;
  }
}
