import { useQuery } from "@tanstack/react-query";
import { fetchCurrentUserData } from "../services/fetch-current-user-data";

export const CURRENT_USER_QUERY_KEY = "CURRENT_USER_QUERY_KEY";

export function useCurrentUserQuery() {
  return useQuery({
    queryKey: [CURRENT_USER_QUERY_KEY],
    queryFn: fetchCurrentUserData,
  });
}
