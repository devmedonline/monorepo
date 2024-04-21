import { fetchEmailVerification } from '@/modules/auth/services/fetch-email-verification';

type VerifyEmailPageProps = {
  params: {
    token: string;
  };
  searchParams: {};
};

export default async function VerifyEmailPage({
  params,
}: VerifyEmailPageProps) {
  const response = await fetchEmailVerification(params.token).catch((error) => {
    console.error(error);
  });

  return (
    <div>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  );
}
