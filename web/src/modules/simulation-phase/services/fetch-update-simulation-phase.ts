import { fetchApi } from "@/shared/lib/fetch-api";
import { UpdateSimulationPhaseDto } from "../types/simulation-phase";

type UpdateSimulationPhaseInput = {
  id: string;
  simulation: UpdateSimulationPhaseDto;
};

export async function fetchUpdateSimulationPhase(
  options: UpdateSimulationPhaseInput
) {
  const response = await fetchApi("/simulation-phase/" + options.id, {
    method: "PATCH",
    body: JSON.stringify({
      title: options.simulation.title,
      content: options.simulation.content,
      thumbnail: options.simulation.thumbnail,
      simulationId: options.simulation.simulationId,
    }),
  });

  return response.data;
}
