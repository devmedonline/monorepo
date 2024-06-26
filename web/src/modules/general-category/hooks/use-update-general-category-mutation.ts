import { POST_QUERY_KEY } from "@/modules/post/hooks/use-post-search-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUpdateGeneralCategory } from "../services/fetch-update-general-category";
import { GENERAL_CATEGORY_QUERY_KEY } from "./use-general-category-search-query";

export function useUpdateGeneralCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchUpdateGeneralCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GENERAL_CATEGORY_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [POST_QUERY_KEY],
      });
    },
  });
}
