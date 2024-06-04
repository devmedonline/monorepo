import { fetchApi } from "@/shared/lib/fetch-api";
import { CreatePostDto } from "../types/post";

export async function fetchCreatePost(post: CreatePostDto) {
  const response = await fetchApi("/post", {
    method: "POST",
    body: JSON.stringify(post),
  });

  return response.data;
}
