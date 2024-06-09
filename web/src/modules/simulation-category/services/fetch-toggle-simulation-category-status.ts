import { fetchApi } from "@/shared/lib/fetch-api";

export async function fetchUpdateSimulationCategory(id: string) {
  const response = await fetchApi(
    "/simulation-category/" + id + "/toggle-public-availability",
    {
      method: "PATCH",
    }
  );

  return response.data;
}
