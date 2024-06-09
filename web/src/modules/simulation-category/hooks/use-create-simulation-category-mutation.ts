import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCreateSimulationCategory } from "../services/fetch-create-simulation-category";
import { SIMULATION_CATEGORY_QUERY_KEY } from "./use-simulation-category-search-query";

export function useCreateSimulationCategoryMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchCreateSimulationCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SIMULATION_CATEGORY_QUERY_KEY],
      });
    },
  });
}
