import { apiClient } from '@/modules/http-client/lib/client';

export type UserSignInResult = {
  message: string;
};

type UserSignInResponse = {
  message: string;
};

export async function userSignIn(): Promise<UserSignInResult> {
  await apiClient.post({
    path: '/auth/refresh',
    guard: (data): data is UserSignInResponse => {
      return 'message' in data;
    },
  });

  return { message: `Bem vindo de volta!` };
}
