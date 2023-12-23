import { Body, Controller, Post } from '@nestjs/common';
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
  async login(@Body() dto: LoginDto) {
    return await this.authService.login(dto);
  }

  @Post('refresh')
  @CheckRefreshJWT()
  async refreshToken(@User() user: UserWithPermissions) {
    console.log('refreshed');

    return await this.authService.refreshToken(user);
  }
}
