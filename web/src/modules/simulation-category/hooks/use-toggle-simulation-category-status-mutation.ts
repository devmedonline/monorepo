import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUpdateSimulationCategory } from "../services/fetch-toggle-simulation-category-status";
import { SIMULATION_CATEGORY_QUERY_KEY } from "./use-simulation-category-search-query";

export function useToggleSimulationCategoryStatusMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchUpdateSimulationCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SIMULATION_CATEGORY_QUERY_KEY],
      });
    },
  });
}
