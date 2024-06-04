import { fetchApi } from "@/shared/lib/fetch-api";
import { FilterPostDto, Post } from "../types/post";

export async function fetchPosts(
  params: FilterPostDto = {}
): Promise<{ posts: Post[] }> {
  const searchParams = new URLSearchParams();

  for (const queryKey in params) {
    if (Object.prototype.hasOwnProperty.call(params, queryKey)) {
      const element = params[queryKey as keyof FilterPostDto];

      if (element) {
        searchParams.set(queryKey, element.toString());
      } else {
        searchParams.delete(queryKey);
      }
    }
  }

  const url = `/post?${searchParams.toString()}`;

  const response = await fetchApi<Post[]>(url, {
    method: "GET",
  });

  return {
    posts: response.data,
  };
}
