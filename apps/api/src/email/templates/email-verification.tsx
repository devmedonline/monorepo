import { Button } from '@react-email/components';
import React from 'react';
import { EmailTemplateLayout } from './template';
React;

type EmailVerificationProps = {
  name: string;
  token: string;
};

export default function EmailVerification({
  name,
  token,
}: EmailVerificationProps) {
  return (
    <EmailTemplateLayout title="Bem vindo!">
      <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700 m-5">
        <p>
          Olá <strong className="text-gray-900 font-bold">{name}</strong>!
        </p>

        <p>
          Seja bem-vindo ao{' '}
          <strong className="text-gray-900 font-bold">
            {process.env.SITE_NAME}
          </strong>
          !
        </p>

        <p>
          Para confirmar seu e-mail, por favor, clique no botão abaixo:
          <Button href={process.env.FRONTEND_URL + '/verify-email/' + token}>
            Confirmar e-mail
          </Button>
        </p>
      </div>
    </EmailTemplateLayout>
  );
}
