import { fetchApi } from "@/shared/lib/fetch-api";

export async function fetchDeleteGeneralCategory(id: string) {
  const response = await fetchApi("/general-category/" + id, {
    method: "DELETE",
  });

  return response.data;
}
