import { MailerService } from '@nestjs-modules/mailer';
import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ActionToken } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmailVerificationService {
  static TOKEN_TYPE = 'email-verification';
  static EXPIRES_IN = 1000 * 60 * 60 * 2;

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: MailerService,
  ) {}

  async triggerEmailVerification(email: string) {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = await this.generateToken(user.id);

    try {
      await this.mailerService.sendMail({
        to: user.email,
        subject: 'Verify your email',
        template: 'email-verification',
        context: {
          name: user.name,
          siteName: process.env.SITE_NAME,
          token,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async generateToken(userId: string) {
    const lastActionToken = await this.prisma.actionToken.findFirst({
      where: {
        userId: userId,
        type: EmailVerificationService.TOKEN_TYPE,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const token = this.canReuseToken(lastActionToken)
      ? lastActionToken.token
      : randomUUID();

    await this.prisma.actionToken.create({
      data: {
        token,
        userId: userId,
        type: EmailVerificationService.TOKEN_TYPE,
        expiresAt: new Date().getTime() + EmailVerificationService.EXPIRES_IN,
      },
    });
  }

  async validateToken(token: string) {
    const storedToken = await this.prisma.$transaction(async (tx) => {
      const storedToken = await tx.actionToken.findUnique({
        where: {
          token,
        },
      });

      if (!storedToken) {
        throw new Error('Invalid token');
      }

      await tx.actionToken.delete({
        where: {
          token: storedToken.token,
        },
      });

      return storedToken;
    });

    if (this.isWithinExpiration(storedToken)) {
      return storedToken.userId;
    }

    throw new Error('Token expired');
  }

  isWithinExpiration(token?: ActionToken) {
    if (!token) {
      return false;
    }

    const tokenExpiresAt = Number(token.expiresAt);

    const tokenExpired = Date.now() > tokenExpiresAt;

    return !tokenExpired;
  }

  canReuseToken(token?: ActionToken) {
    if (!token) {
      return false;
    }

    const tokenCanReuse =
      Date.now() - token.createdAt.getTime() <
      EmailVerificationService.EXPIRES_IN / 2;

    return tokenCanReuse;
  }
}
