import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCreatePost } from "../services/fetch-create-post";
import { POST_QUERY_KEY } from "./use-post-search-query";

export function useCreatePostMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchCreatePost,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [POST_QUERY_KEY],
      });
    },
  });
}
