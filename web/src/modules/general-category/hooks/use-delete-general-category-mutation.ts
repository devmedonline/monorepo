import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDeleteGeneralCategory } from "../services/fetch-delete-general-category";
import { GENERAL_CATEGORY_QUERY_KEY } from "./use-general-category-search-query";

export function useDeleteGeneralCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchDeleteGeneralCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GENERAL_CATEGORY_QUERY_KEY],
      });
    },
  });
}
