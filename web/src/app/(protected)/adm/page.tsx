import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { fetchWithServerSession } from '@/modules/auth/lib/server-fetch-with-session';
import { getServerSession } from 'next-auth';

export default async function AdmHome() {
  const session = await getServerSession(authOptions);

  console.log('sesssss', session);

  const response = await fetchWithServerSession('/user');

  const data = await response.json();

  return (
    <main>
      <h1>Adm Home</h1>

      <pre>
        <code>{JSON.stringify(data, null, 2)}</code>
      </pre>
    </main>
  );
}
