import { Injectable } from '@nestjs/common';
import { EmailMessage } from './entities/email.entity';

@Injectable()
export class EmailService {
  async sendEmail(message: EmailMessage): Promise<string[]> {
    const payload = {
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
      const errorResponse: EmailErrorResponse = await response.json();
      throw new Error(
        'Failed to send email: ' + errorResponse.errors.join(', '),
      );
    }

    const successResponse: EmailSuccessResponse = await response.json();

    return successResponse.message_ids;
  }
}

type EmailSuccessResponse = {
  success: true;
  message_ids: string[];
};

type EmailErrorResponse = {
  success: false;
  errors: string[];
};
