import { fetchApi } from "@/shared/lib/fetch-api";
import { CreateSimulationPhaseDto } from "../types/simulation-phase";

export async function fetchCreateSimulationPhase(
  simulationPhase: CreateSimulationPhaseDto
) {
  const response = await fetchApi("/simulation-phase", {
    method: "POST",
    body: JSON.stringify(simulationPhase),
  });

  return response.data;
}
