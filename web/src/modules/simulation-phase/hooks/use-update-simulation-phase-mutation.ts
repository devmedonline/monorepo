import { SIMULATION_QUERY_KEY } from "@/modules/simulation/hooks/use-simulation-search-query";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUpdateSimulationPhase } from "../services/fetch-update-simulation-phase";
import { SIMULATION_PHASE_QUERY_KEY } from "./use-simulation-phase-query";

export function useUpdateSimulationPhaseMutation() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: fetchUpdateSimulationPhase,
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
