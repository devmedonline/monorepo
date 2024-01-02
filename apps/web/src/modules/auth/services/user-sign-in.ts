import { apiClient } from '@/modules/http-client/lib/client';
import { UserSignInFormValues } from '../components/user-sign-in-form';

export type UserSignInResult = {
  message: string;
};

type UserSignInResponse = {
  message: string;
};

export async function userSignIn(
  values: UserSignInFormValues
): Promise<UserSignInResult> {
  const response = await apiClient.post({
    path: '/auth/login',
    init: { body: values },
    guard: (data): data is UserSignInResponse => {
      return 'user' in data;
    },
  });

  return { message: response.message };
}
