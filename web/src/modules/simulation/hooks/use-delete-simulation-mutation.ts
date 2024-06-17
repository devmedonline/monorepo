import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDeleteSimulation } from "../services/fetch-delete-simulation";
import { SIMULATION_QUERY_KEY } from "./use-simulation-search-query";

export function useDeleteSimulationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchDeleteSimulation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SIMULATION_QUERY_KEY],
      });
    },
  });
}
