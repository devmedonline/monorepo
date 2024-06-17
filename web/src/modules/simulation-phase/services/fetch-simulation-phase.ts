import { fetchApi } from "@/shared/lib/fetch-api";
import { SimulationPhase } from "../types/simulation-phase";

export async function fetchSimulationPhase(
  simulationPhaseId: string
): Promise<SimulationPhase> {
  const searchParams = new URLSearchParams();

  searchParams.set("simulationPhaseId", String(simulationPhaseId));
  const url = `/simulation-phase/${searchParams.toString()}`;

  const response = await fetchApi<SimulationPhase>(url, {
    method: "GET",
  });

  return response.data;
}
