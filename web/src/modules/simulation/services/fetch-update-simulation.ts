import { fetchApi } from "@/shared/lib/fetch-api";
import { UpdateSimulationDto } from "../types/simulation";

type UpdateSimulationInput = {
  id: string;
  simulation: UpdateSimulationDto;
};

export async function fetchUpdateSimulation(options: UpdateSimulationInput) {
  const response = await fetchApi("/simulation/" + options.id, {
    method: "PATCH",
    body: JSON.stringify({
      title: options.simulation.title,
      content: options.simulation.content,
      thumbnail: options.simulation.thumbnail,
      publicAvailable: options.simulation.publicAvailable,
      simulationCategoryId: options.simulation.simulationCategoryId,
    }),
  });

  return response.data;
}
