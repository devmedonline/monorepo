import { apiClient } from '@/modules/http-client/lib/client';
import { UserSignUpFormValues } from '../components/user-sign-up-form';

export type UserSignUpResult = {
  message: string;
};

type UserSignUpResponse = {
  message: string;
};

export async function userSignUp(
  values: UserSignUpFormValues
): Promise<UserSignUpResult> {
  await apiClient.post({
    path: '/auth/register',
    init: {
      body: {
        name: values.name,
        email: values.email,
        password: values.password,
      },
    },
    guard: (data): data is UserSignUpResponse => {
      return 'message' in data;
    },
  });

  return { message: `Bem vindo ${values.firstName}!` };
}
