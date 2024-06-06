import { fetchApi } from "@/shared/lib/fetch-api";
import { CreatePostDto, PostPublicAvailable } from "../types/post";

export async function fetchCreatePost(post: CreatePostDto) {
  const response = await fetchApi("/post", {
    method: "POST",
    body: JSON.stringify({
      title: post.title,
      content: post.content,
      thumbnail: post.thumbnail,
      publicAvailable: post.publicAvailable === PostPublicAvailable.Published,
      generalCategoryId: post.generalCategoryId,
    }),
  });

  return response.data;
}
