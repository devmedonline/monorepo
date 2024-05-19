import { Injectable } from '@nestjs/common';
import { EmailMessage } from './entities/email.entity';

type EmailPayload = {
  to: {
    email: string;
    name: string;
  }[];
  from: {
    email: string;
    name: string;
  };
  subject: string;
  html: string;
  category: string;
};

@Injectable()
export class EmailService {
  async sendEmail(message: EmailMessage): Promise<string[]> {
    const payload: EmailPayload = {
      to: [
        {
          email: message.to.email,
          name: message.to.name,
        },
      ],
      from: {
        email: message.from.email,
        name: message.from.name,
      },
      subject: message.subject,
      html: message.body,
      category: 'email',
    };

    return this.fetchEmailAPI(payload);
  }

  private async fetchEmailAPI(payload: EmailPayload) {
    const init: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Api-Token': process.env.MAILER_API_KEY,
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    };

    const response = await fetch(process.env.MAILER_API_ENDPOINT, init);

    if (!response.ok) {
      const errorResponse = await response.text();
      throw new Error('Failed to send email: ' + errorResponse);
    }

    const successResponse: EmailSuccessResponse = await response.json();

    return successResponse.message_ids;
  }
}

type EmailSuccessResponse = {
  success: true;
  message_ids: string[];
};
