import { fetchApi } from "@/shared/lib/fetch-api";

export async function fetchUpdateGeneralCategory(id: string) {
  const response = await fetchApi(
    "/general-category/" + id + "/toggle-public-availability",
    {
      method: "PATCH",
    }
  );

  return response.data;
}
