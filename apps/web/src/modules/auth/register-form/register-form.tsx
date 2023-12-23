'use client';

import { useState } from 'react';

type FormState = {
  submiting: boolean;
  submitted: boolean;
  error: Error | null;
};

export function RegisterForm() {
  const [formState, setFormState] = useState<FormState>({
    submiting: false,
    submitted: false,
    error: null,
  });

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setFormState((old) => ({
      ...old,
      submiting: true,
    }));

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email');
    const password = formData.get('password');
    const name = formData.get('name');
    const action = event.currentTarget.action;

    try {
      const response = await fetch(action, {
        method: 'POST',
        body: JSON.stringify({
          email,
          password,
          name,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      setFormState((old) => ({
        ...old,
        error: null,
      }));
    } catch (error) {
      setFormState((old) => ({
        ...old,
        error: error instanceof Error ? error : new Error('Unknown error'),
      }));
    } finally {
      setFormState((old) => ({
        ...old,
        submiting: false,
        submitted: true,
      }));
    }
  };

  return (
    <form action="/api/auth/register" method="POST" onSubmit={onSubmit}>
      <div>
        {formState.error && (
          <div>
            <p>{formState.error.message}</p>
          </div>
        )}

        {formState.submitted && (
          <div>
            <p>Registered!</p>
          </div>
        )}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
      </div>

      <div>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />
      </div>

      <button type="submit">Register</button>
    </form>
  );
}
