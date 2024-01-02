import { CURRENT_USER_PROFILE_QUERY_KEY } from '@/modules/user/hooks/user-current-user-profile-query';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userSignIn } from '../services/user-sign-in';

export function useSignInMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: userSignIn,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [CURRENT_USER_PROFILE_QUERY_KEY],
      });
    },
  });
}
