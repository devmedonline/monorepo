import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UserService } from 'src/user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Crypto } from './crypto';

@Module({
  providers: [AuthService, Crypto, UserService, PrismaService, JwtService],
  controllers: [AuthController],
})
export class AuthModule {}
