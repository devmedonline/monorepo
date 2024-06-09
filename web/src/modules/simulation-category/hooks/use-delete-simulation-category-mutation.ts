import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDeleteSimulationCategory } from "../services/fetch-delete-simulation-category";
import { SIMULATION_CATEGORY_QUERY_KEY } from "./use-simulation-category-search-query";

export function useDeleteSimulationCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchDeleteSimulationCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SIMULATION_CATEGORY_QUERY_KEY],
      });
    },
  });
}
