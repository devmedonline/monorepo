import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUpdatePost } from "../services/fetch-toggle-post-status";
import { POST_QUERY_KEY } from "./use-post-search-query";

export function useTogglePostStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchUpdatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POST_QUERY_KEY],
      });
    },
  });
}
