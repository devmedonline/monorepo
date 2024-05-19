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
  async login(@Body() dto: LoginDto) {
    const user = await this.authService.login(dto);
    return new BasicResponseWrapper({ data: user });
  }

  @Post('refresh')
  @CheckRefreshJWT()
  async refreshToken(@User() user: UserWithPermissions) {
    const refresh = await this.authService.refreshToken(user);
    return new BasicResponseWrapper({ data: refresh });
  }

  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie(process.env.JWT_REFRESH_COOKIE_NAME);
    response.clearCookie(process.env.JWT_COOKIE_NAME);
    return new BasicResponseWrapper({ data: 'Saiu com sucesso!' });
  }
}
