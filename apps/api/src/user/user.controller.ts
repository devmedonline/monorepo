import { Controller, Get, Query } from '@nestjs/common';
import { CheckJWT } from 'src/auth/guards/jwt.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('search')
  @CheckJWT()
  findOne(@Query('name') name: string) {
    return this.userService.searchByName(name);
  }
}
