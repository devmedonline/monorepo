import { emails } from '@/modules/email/templates';

import { render } from '@react-email/render';
import { NextRequest } from 'next/server';

type GetProps = {
  params: {
    slug: string;
  };
};

export const GET = async (req: NextRequest, props: GetProps) => {
  const slug = props.params.slug;

  if (typeof slug !== 'string' || !slug) {
    return new Response('Not found', { status: 404 });
  }

  const EmailTemplate = emails[slug as keyof typeof emails];

  if (!EmailTemplate) {
    return new Response('Not found', { status: 404 });
  }

  const html = render(<EmailTemplate />, {
    pretty: true,
  });

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html',
    },
  });
};
