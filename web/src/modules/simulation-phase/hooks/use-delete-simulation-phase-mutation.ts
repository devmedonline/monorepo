import { SIMULATION_QUERY_KEY } from "@/modules/simulation/hooks/use-simulation-search-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchDeleteSimulationPhase } from "../services/fetch-delete-simulation-phase";
import { SIMULATION_PHASE_QUERY_KEY } from "./use-simulation-phase-query";

export function useDeleteSimulationPhaseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchDeleteSimulationPhase,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [SIMULATION_PHASE_QUERY_KEY],
      });

      queryClient.invalidateQueries({
        queryKey: [SIMULATION_QUERY_KEY],
      });
    },
  });
}
