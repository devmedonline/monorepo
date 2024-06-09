import { POST_QUERY_KEY } from "@/modules/post/hooks/use-post-search-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUpdateSimulationCategory } from "../services/fetch-update-simulation-category";
import { SIMULATION_CATEGORY_QUERY_KEY } from "./use-simulation-category-search-query";

export function useUpdateSimulationCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchUpdateSimulationCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SIMULATION_CATEGORY_QUERY_KEY],
      });
      queryClient.invalidateQueries({
        queryKey: [POST_QUERY_KEY],
      });
    },
  });
}
