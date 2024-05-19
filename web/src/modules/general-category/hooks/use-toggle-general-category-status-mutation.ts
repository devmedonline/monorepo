import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUpdateGeneralCategory } from "../services/fetch-toggle-general-category-status";
import { GENERAL_CATEGORY_QUERY_KEY } from "./use-general-category-search-query";

export function useToggleGeneralCategoryStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchUpdateGeneralCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [GENERAL_CATEGORY_QUERY_KEY],
      });
    },
  });
}
