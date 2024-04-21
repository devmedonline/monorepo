import { fetchSignUp } from '@/modules/auth/services/fetch-sign-up';
import { redirect } from 'next/navigation';

const signUpMutation = async (formData: FormData) => {
  'use server';

  try {
    await fetchSignUp(formData);
    return redirect('/api/auth/signin');
  } catch (error) {
    console.error(error);
    const message =
      error instanceof Error ? error.message : 'Aconteceu um erro';
    return { error: message };
  }
};

export default function Register() {
  return (
    <main>
      <h1>Register</h1>

      <form action={signUpMutation} className="flex flex-col gap-4">
        <label htmlFor="name">Nome</label>
        <input type="name" id="name" name="name" />

        <label htmlFor="email">Email</label>
        <input type="email" id="email" name="email" />

        <label htmlFor="password">Senha</label>
        <input
          type="password"
          id="password"
          name="password"
          pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
        />

        <button type="submit">Cadastrar</button>
      </form>
    </main>
  );
}
