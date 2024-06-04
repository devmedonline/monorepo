import { useQuery } from "@tanstack/react-query";
import { fetchPosts } from "../services/fetch-posts";
import { FilterPostDto } from "../types/post";

export const POST_QUERY_KEY = "POST_QUERY_KEY";

export function usePostQuery(params: FilterPostDto) {
  return useQuery({
    queryKey: [POST_QUERY_KEY, params],
    queryFn: () => fetchPosts(params),
  });
}
