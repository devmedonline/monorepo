import { fetchApi } from "@/shared/lib/fetch-api";

export async function fetchDeleteSimulationCategory(id: string) {
  const response = await fetchApi("/simulation-category/" + id, {
    method: "DELETE",
  });

  return response.data;
}
