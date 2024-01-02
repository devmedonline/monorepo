import { apiClient } from '@/modules/http-client/lib/client';

type VerifyEmailPageProps = {
  params: {
    token: string;
  };
  searchParams: {};
};

export default async function VerifyEmailPage(props: VerifyEmailPageProps) {
  const response = await apiClient.patch({
    path: '/user/email-verification/' + props.params.token,
    guard: (data): data is { userId: string } => {
      return typeof data.userId === 'string';
    },
  });

  return (
    <div>
      VerifyEmailPage:
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}
