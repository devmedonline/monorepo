import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDeletePost } from "../services/fetch-delete-post";
import { POST_QUERY_KEY } from "./use-post-search-query";

export function useDeletePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchDeletePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POST_QUERY_KEY],
      });
    },
  });
}
