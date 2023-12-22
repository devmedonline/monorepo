import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { UserService } from './user.service';
import { User as UserModel } from '@prisma/client';
import { ApiBody } from '@nestjs/swagger';

class UserSignUpDto {
  public id: string = '';
}

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly userService: UserService,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('user')
  @ApiBody({ type: UserSignUpDto })
  async signupUser(@Body() userData: UserSignUpDto): Promise<UserModel> {
    return this.userService.createUser({
      id: userData.id,
    });
  }
}
