import { fetchApi } from "@/shared/lib/fetch-api";

export async function fetchDeleteSimulation(id: string) {
  const response = await fetchApi("/simulation/" + id, {
    method: "DELETE",
  });

  return response.data;
}
