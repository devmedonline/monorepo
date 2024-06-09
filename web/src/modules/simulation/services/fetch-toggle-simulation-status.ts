import { fetchApi } from "@/shared/lib/fetch-api";

export async function fetchUpdateSimulation(id: string) {
  const response = await fetchApi(
    "/simulation/" + id + "/toggle-public-availability",
    {
      method: "PATCH",
    }
  );

  return response.data;
}
