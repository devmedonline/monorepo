import {
  Body,
  Controller,
  Get,
  Logger,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CheckJWT, User } from 'src/auth/guards/jwt.guard';
import { BasicResponseWrapper } from 'src/common/entities/basic-response-wrapper.entity';
import { UpdateEmailDto } from './dto/update-email.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserWithPermissions } from './dto/user-with-permissions.dto';
import { EmailVerificationService } from './email-verification.service';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  private readonly logger = new Logger(UserController.name);

  constructor(
    private readonly userService: UserService,
    private readonly emailVerificationService: EmailVerificationService,
  ) {}

  @Get()
  @CheckJWT()
  async findAll() {
    const users = await this.userService.findAll();

    return new BasicResponseWrapper({ data: users });
  }

  @Get('search')
  @CheckJWT()
  async search(@Query('search') name: string) {
    const users = await this.userService.search(name);

    return new BasicResponseWrapper({ data: users });
  }

  @Get('me')
  @CheckJWT()
  me(@User() user: UserWithPermissions) {
    this.logger.log('User data requested');
    this.logger.log(user);
    return new BasicResponseWrapper({ data: user });
  }

  @Get('permissions')
  @CheckJWT()
  permissions(@User() user: UserWithPermissions) {
    return new BasicResponseWrapper({ data: user.permissions });
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

    return new BasicResponseWrapper({ data: updatedUser });
  }

  @Patch('name')
  @CheckJWT()
  async updateName(
    @User() user: UserWithPermissions,
    @Body() body: { name: string },
  ) {
    const updatedUser = await this.userService.updateName(user.id, body.name);

    return new BasicResponseWrapper({ data: updatedUser });
  }

  @Patch('update-password')
  @CheckJWT()
  async updatePassword(
    @User() user: UserWithPermissions,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    await this.userService.updatePassword(user.id, updatePasswordDto.password);

    return new BasicResponseWrapper({ data: 'Senha atualizada com sucesso!' });
  }

  @Patch('email')
  @CheckJWT()
  async updateEmail(
    @User() user: UserWithPermissions,
    @Body() body: UpdateEmailDto,
  ) {
    const updatedUser = await this.userService.updateEmail(user.id, body.email);

    return new BasicResponseWrapper({ data: updatedUser });
  }

  @Post('resend-email-verification')
  @CheckJWT()
  async resendEmailVerification(@User() user: UserWithPermissions) {
    await this.emailVerificationService.triggerEmailVerification(user.email);

    return new BasicResponseWrapper({
      data: 'E-mail de verificação enviado! Cheque sua caixa de e-mail',
    });
  }

  @Patch('email-verification/:token')
  async verifyEmail(@Param('token') token: string) {
    const userId = await this.emailVerificationService.validateToken(token);

    await this.userService.updateVerified(userId, true);

    return new BasicResponseWrapper({ data: { userId } });
  }
}
