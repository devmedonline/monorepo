import { Body, Head, Html, Tailwind } from '@react-email/components';
import React from 'react';
React;

type EmailTemplateLayoutProps = {
  children: React.ReactNode;
  title: string;
};

export function EmailTemplateLayout({
  children,
  title,
}: EmailTemplateLayoutProps) {
  return (
    <Html>
      <Head>
        <title>{title}</title>
      </Head>
      <Body>
        <Tailwind>{children}</Tailwind>
      </Body>
    </Html>
  );
}
