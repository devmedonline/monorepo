import { fetchApi } from "@/shared/lib/fetch-api";
import { UpdateGeneralCategoryDto } from "../types/general-category";

type UpdateGeneralCategoryInput = {
  id: string;
  category: UpdateGeneralCategoryDto;
};

export async function fetchUpdateGeneralCategory(
  options: UpdateGeneralCategoryInput
) {
  const response = await fetchApi("/general-category/" + options.id, {
    method: "PATCH",
    body: JSON.stringify({
      name: options.category.name,
      description: options.category.description,
      thumbnail: options.category.thumbnail,
    }),
  });

  return response.data;
}
