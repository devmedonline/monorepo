import { Body, Head, Html, Tailwind } from '@react-email/components';
import { EmailTemplate } from '../types/email';

type EmailTemplateLayoutProps = {
  children: React.ReactNode;
};

export const emailTemplateLayoutParameters = {
  title: {
    hbs: '{{title}}',
  },
} satisfies EmailTemplate;

export function EmailTemplateLayout({ children }: EmailTemplateLayoutProps) {
  return (
    <Html>
      <Head>
        <title>{emailTemplateLayoutParameters.title.hbs}</title>
      </Head>
      <Body>
        <Tailwind>{children}</Tailwind>
      </Body>
    </Html>
  );
}
