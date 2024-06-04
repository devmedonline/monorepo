import { fetchApi } from "@/shared/lib/fetch-api";

export async function fetchDeletePost(id: string) {
  const response = await fetchApi("/post/" + id, {
    method: "DELETE",
  });

  return response.data;
}
