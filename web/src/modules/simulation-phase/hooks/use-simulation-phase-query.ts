import { useQuery } from "@tanstack/react-query";
import { fetchSimulationPhase } from "../services/fetch-simulation-phase";

export const SIMULATION_PHASE_QUERY_KEY = "SIMULATION_PHASE_QUERY_KEY";

export function useSimulationPhaseQuery(simulationPhaseId: string) {
  return useQuery({
    queryKey: [SIMULATION_PHASE_QUERY_KEY, simulationPhaseId],
    queryFn: () => fetchSimulationPhase(simulationPhaseId),
    enabled: Boolean(simulationPhaseId),
  });
}
