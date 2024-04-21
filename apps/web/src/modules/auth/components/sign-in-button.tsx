'use client';

import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

export function SignInButton() {
  const session = useSession();

  if (session.status === 'loading') {
    return <button disabled>Carregando...</button>;
  }

  if (session.status === 'authenticated') {
    return (
      <button onClick={() => signIn()}>Sair - {session.data.user.name}</button>
    );
  }

  return (
    <>
      <button onClick={() => signIn()}>Entrar</button>
      <Link href="/register">Cadastrar</Link>
    </>
  );
}
