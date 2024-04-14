import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { render } from '@react-email/components';
import { MailgunService } from 'nestjs-mailgun';
import EmailVerification from './templates/email-verification';

@Injectable()
export class EmailService {
  constructor(
    private readonly mailerService: MailgunService,
    private readonly domain = process.env.MG_DOMAIN,
  ) {}

  async sendEmailVerification(email: string, token: string) {
    try {
      await this.mailerService.createEmail(this.domain, {
        to: email,
        subject: 'Verify your email',
        html: render(
          EmailVerification({
            name: email,
            siteName: process.env.SITE_NAME,
            token,
          }),
        ),
        context: {
          siteName: process.env.SITE_NAME,
          token,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async sendPasswordReset(email: string, token: string) {
    try {
      await this.mailerService.createEmail(this.domain, {
        to: email,
        subject: 'Reset your password',
        html: `<p>Click <a href="${process.env.FRONTEND_URL}/reset-password?token=${token}">here</a> to reset your password</p>`,
        context: {
          siteName: process.env.SITE_NAME,
          token,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
