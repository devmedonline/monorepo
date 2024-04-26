import { render } from '@react-email/components';
import { env } from 'process';
import type React from 'react';

type EmailAddress = {
  email: string;
  name: string;
};

export class EmailMessage {
  private _body: string;
  public readonly from: EmailAddress = {
    email: 'noreply@' + env.MAILER_DOMAIN,
    name: env.SITE_NAME,
  };

  constructor(
    public readonly to: EmailAddress,
    public readonly subject: string,
    body: string | React.ReactElement,
  ) {
    if (typeof body === 'string') {
      this._body = body;
    } else {
      this._body = render(body);
    }
  }

  get body() {
    return this._body;
  }
}
