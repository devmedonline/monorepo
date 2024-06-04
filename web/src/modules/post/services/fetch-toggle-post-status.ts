import { fetchApi } from "@/shared/lib/fetch-api";

export async function fetchUpdatePost(id: string) {
  const response = await fetchApi(
    "/post/" + id + "/toggle-public-availability",
    {
      method: "PATCH",
    }
  );

  return response.data;
}
