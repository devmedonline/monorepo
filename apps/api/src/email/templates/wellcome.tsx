import React from 'react';
import { EmailTemplateLayout } from './template';
React;

type WellcomeProps = {
  name: string;
  siteName: string;
};

export default function Wellcome({ name, siteName }: WellcomeProps) {
  return (
    <EmailTemplateLayout title="Bem vindo!">
      <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700 m-5">
        <p>
          Olá <strong className="text-gray-900 font-bold">{name}</strong>!
        </p>

        <p>
          Seja bem-vindo ao{' '}
          <strong className="text-gray-900 font-bold">{siteName}</strong>!
        </p>
      </div>
    </EmailTemplateLayout>
  );
}
