import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUpdateSimulation } from "../services/fetch-update-simulation";
import { SIMULATION_QUERY_KEY } from "./use-simulation-search-query";

export function useUpdateSimulationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchUpdateSimulation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SIMULATION_QUERY_KEY],
      });
    },
  });
}
