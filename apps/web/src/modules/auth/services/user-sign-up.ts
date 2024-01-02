import { apiClient } from '@/modules/http-client/lib/client';
import { User } from '@/modules/user/types/user';
import { UserSignUpFormValues } from '../components/user-sign-up-form';

export type UserSignUpResult = {
  message: string;
};

type UserSignUpResponse = User

export async function userSignUp(
  values: UserSignUpFormValues
): Promise<UserSignUpResult> {
  const response = await apiClient.post({
    path: '/auth/register',
    init: {
      body: {
        name: values.name,
        email: values.email,
        password: values.password,
      },
    },
    guard: (data): data is UserSignUpResponse => {
      return 'name' in data;
    },
  });

  return { message: `Bem vindo ${response.data.name}!` };
}
