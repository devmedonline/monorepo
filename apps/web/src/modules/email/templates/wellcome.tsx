import { EmailTemplate } from '../types/email';
import { EmailTemplateLayout } from './template';

export const wellcomeEmailParameters = {
  name: { hbs: '{{title}}' },
  siteName: { hbs: '{{siteName}}' },
} satisfies EmailTemplate;

export function WellcomeEmail() {
  return (
    <EmailTemplateLayout>
      <div className="bg-white rounded-lg shadow-lg p-6 text-gray-700 m-5">
        <p>
          Olá{' '}
          <strong className="text-gray-900 font-bold">
            {wellcomeEmailParameters.name.hbs}
          </strong>
          !
        </p>

        <p>
          Seja bem-vindo ao{' '}
          <strong className="text-gray-900 font-bold">
            {wellcomeEmailParameters.siteName.hbs}
          </strong>
          !
        </p>
      </div>
    </EmailTemplateLayout>
  );
}
