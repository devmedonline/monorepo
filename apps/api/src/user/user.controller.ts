import { Body, Controller, Get, Patch, Query } from '@nestjs/common';
import { CheckJWT, User } from 'src/auth/guards/jwt.guard';
import { BasicResponseWrapper } from 'src/common/entities/basic-response-wrapper.entity';
import { UserWithPermissions } from './dto/user-with-permissions.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @CheckJWT()
  async findAll() {
    const users = await this.userService.findAll();

    return new BasicResponseWrapper({
      success: true,
      message: 'Users fetched successfully',
      data: users,
    });
  }

  @Get('search')
  @CheckJWT()
  async search(@Query('search') name: string) {
    const users = await this.userService.search(name);

    return new BasicResponseWrapper({
      success: true,
      message: 'Users fetched successfully',
      data: users,
    });
  }

  @Get('me')
  @CheckJWT()
  me(@User() user: UserWithPermissions) {
    return new BasicResponseWrapper({
      success: true,
      message: 'User fetched successfully',
      data: user,
    });
  }

  @Get('permissions')
  @CheckJWT()
  permissions(@User() user: UserWithPermissions) {
    return new BasicResponseWrapper({
      success: true,
      message: 'Permissions fetched successfully',
      data: user.permissions,
    });
  }

  @Patch('avatar')
  @CheckJWT()
  async updatePersonalData(
    @User() user: UserWithPermissions,
    @Body() body: { avatar: string },
  ) {
    const updatedUser = await this.userService.updateAvatar(
      user.id,
      body.avatar,
    );

    return new BasicResponseWrapper({
      success: true,
      message: 'Avatar updated successfully',
      data: updatedUser,
    });
  }

  @Patch('name')
  @CheckJWT()
  async updateName(
    @User() user: UserWithPermissions,
    @Body() body: { name: string },
  ) {
    const updatedUser = await this.userService.updateName(user.id, body.name);

    return new BasicResponseWrapper({
      success: true,
      message: 'Name updated successfully',
      data: updatedUser,
    });
  }
}
