import { useQuery } from '@tanstack/react-query';
import { getCurrentUserProfile } from '../services/get-current-user-profile';

export const CURRENT_USER_PROFILE_QUERY_KEY = 'CURRENT_USER_PROFILE_QUERY_KEY';

export function useCurrentUserProfileQuery() {
  return useQuery({
    queryKey: [CURRENT_USER_PROFILE_QUERY_KEY],
    queryFn: getCurrentUserProfile,
  });
}
