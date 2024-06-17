import { useQuery } from "@tanstack/react-query";
import {
  SimulationsInput,
  fetchSimulations,
} from "../services/fetch-simulations";

export const SIMULATION_QUERY_KEY = "SIMULATION_QUERY_KEY";

export function useSimulationQuery(params: SimulationsInput) {
  return useQuery({
    queryKey: [SIMULATION_QUERY_KEY, params],
    queryFn: () => fetchSimulations(params),
  });
}
