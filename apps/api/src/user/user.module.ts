import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Crypto } from 'src/auth/crypto';
import { EmailModule } from 'src/email/email.module';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma.service';
import { EmailVerificationService } from './email-verification.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  controllers: [UserController],
  imports: [EmailModule],
  providers: [
    UserService,
    Crypto,
    PrismaService,
    JwtService,
    EmailService,
    EmailVerificationService,
  ],
})
export class UserModule {}
