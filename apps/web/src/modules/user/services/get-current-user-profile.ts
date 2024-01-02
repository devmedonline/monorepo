import { apiClient } from '@/modules/http-client/lib/client';
import { User } from '../types/user';

type GetCurrentUserProfileResult = User;

export async function getCurrentUserProfile(): Promise<GetCurrentUserProfileResult> {
  const response = await apiClient.get({
    path: '/user/me',
    guard: (data): data is GetCurrentUserProfileResult => {
      return true;
    },
  });

  return response.data;
}
  