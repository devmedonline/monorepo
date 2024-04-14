import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ActionToken } from '@prisma/client';
import { randomUUID } from 'node:crypto';
import { EmailService } from 'src/email/email.service';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class EmailVerificationService {
  static TOKEN_TYPE = 'email-verification';
  static EXPIRES_IN = 1000 * 60 * 60 * 2;

  constructor(
    private readonly prisma: PrismaService,
    private readonly mailerService: EmailService,
  ) {}

  async triggerEmailVerification(email: string): Promise<void> {
    const user = await this.prisma.user.findUnique({
      select: { id: true },
      where: { email: email },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const token = await this.generateToken(user.id);

    try {
      await this.mailerService.sendEmailVerification(email, token);
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async validateToken(token: string): Promise<string> {
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

  private async generateToken(userId: string): Promise<string> {
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

    return token;
  }

  private isWithinExpiration(token?: ActionToken): boolean {
    if (!token) {
      return false;
    }

    const tokenExpiresAt = Number(token.expiresAt);

    const tokenExpired = Date.now() > tokenExpiresAt;

    return !tokenExpired;
  }

  private canReuseToken(token?: ActionToken): boolean {
    if (!token) {
      return false;
    }

    const tokenCanReuse =
      Date.now() - token.createdAt.getTime() <
      EmailVerificationService.EXPIRES_IN / 2;

    return tokenCanReuse;
  }
}
