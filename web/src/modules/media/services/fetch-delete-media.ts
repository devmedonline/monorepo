import { fetchApi } from "@/shared/lib/fetch-api";

export async function fetchDeleteMedia(key: string) {
  const response = await fetchApi(`/file-upload/${key}`, {
    method: "DELETE",
  });

  return response.data;
}
