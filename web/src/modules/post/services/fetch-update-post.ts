import { fetchApi } from "@/shared/lib/fetch-api";
import { UpdatePostDto } from "../types/post";

type UpdatePostInput = {
  id: string;
  post: UpdatePostDto;
};

export async function fetchUpdatePost(options: UpdatePostInput) {
  const response = await fetchApi("/post/" + options.id, {
    method: "PATCH",
    body: JSON.stringify({
      title: options.post.title,
      content: options.post.content,
      thumbnail: options.post.thumbnail,
      generalCategoryId: options.post.generalCategoryId,
      publicAvailable: options.post.publicAvailable,
    }),
  });

  return response.data;
}
