import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchCreateSimulation } from "../services/fetch-create-simulation";
import { SIMULATION_QUERY_KEY } from "./use-simulation-search-query";

export function useCreateSimulationMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchCreateSimulation,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SIMULATION_QUERY_KEY],
      });
    },
  });
}
