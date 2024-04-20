import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma.service';
import { EmailVerificationService } from 'src/user/email-verification.service';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Crypto } from './crypto';

@Module({
  imports: [EmailModule],
  providers: [
    AuthService,
    Crypto,
    UserService,
    PrismaService,
    JwtService,
    EmailVerificationService,
    EmailService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
