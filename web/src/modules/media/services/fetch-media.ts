import { fetchApi } from "@/shared/lib/fetch-api";
import { Media } from "../types/media";

export type MediaInput = {
  search?: string;
  page?: number;
  take?: number;
};

export async function fetchMedia(
  params: MediaInput = {}
): Promise<{ media: Media[] }> {
  const searchParams = new URLSearchParams();

  if (params.search) {
    searchParams.set("search", params.search);
  }

  if (params.page) {
    searchParams.set("page", String(params.page));
  }

  if (params.take) {
    searchParams.set("take", String(params.take));
  }

  const url = `/file-upload?${searchParams.toString()}`;

  const response = await fetchApi<Media[]>(url, {
    method: "GET",
  });

  return {
    media: response.data,
  };
}
