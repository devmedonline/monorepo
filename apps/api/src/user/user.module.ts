import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Crypto } from 'src/auth/crypto';
import { PrismaService } from 'src/prisma.service';
import { EmailVerificationService } from './email-verification.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  providers: [
    UserService,
    Crypto,
    PrismaService,
    JwtService,
    EmailVerificationService,
  ],
})
export class UserModule {}
