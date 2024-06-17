import { fetchApi } from "@/shared/lib/fetch-api";

export async function fetchDeleteSimulationPhase(id: string) {
  const response = await fetchApi("/simulation-phase/" + id, {
    method: "DELETE",
  });

  return response.data;
}
