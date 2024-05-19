import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCreateGeneralCategory } from "../services/fetch-create-general-category";
import { GENERAL_CATEGORY_QUERY_KEY } from "./use-general-category-search-query";

export function useCreateGeneralCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchCreateGeneralCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GENERAL_CATEGORY_QUERY_KEY],
      });
    },
  });
}
