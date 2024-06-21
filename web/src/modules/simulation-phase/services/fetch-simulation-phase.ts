import { fetchApi } from "@/shared/lib/fetch-api";
import { SimulationPhase } from "../types/simulation-phase";

export async function fetchSimulationPhase(
  simulationPhaseId: string
): Promise<SimulationPhase> {
  const url = `/simulation-phase/${simulationPhaseId}`;

  const response = await fetchApi<SimulationPhase>(url, {
    method: "GET",
  });

  return response.data;
}
