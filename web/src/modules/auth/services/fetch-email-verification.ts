export async function fetchEmailVerification(token: string): Promise<void> {
  const response = await fetch(
    process.env.API_URL + '/user/email-verification/' + token,
    {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      next: {
        revalidate: false,
      },
    }
  );

  if (response.ok) {
    return response.json();
  }

  const failed = await response.json();

  const intl = new Intl.ListFormat('pt-BR', {
    style: 'long',
    type: 'conjunction',
  });

  throw new Error(
    Array.isArray(failed.message) ? intl.format(failed.message) : failed.message
  );
}
