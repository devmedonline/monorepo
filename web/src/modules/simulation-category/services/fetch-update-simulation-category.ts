import { fetchApi } from "@/shared/lib/fetch-api";
import { UpdateSimulationCategoryDto } from "../types/simulation-category";

type UpdateSimulationCategoryInput = {
  id: string;
  category: UpdateSimulationCategoryDto;
};

export async function fetchUpdateSimulationCategory(
  options: UpdateSimulationCategoryInput
) {
  const response = await fetchApi("/simulation-category/" + options.id, {
    method: "PATCH",
    body: JSON.stringify({
      name: options.category.name,
      description: options.category.description,
      thumbnail: options.category.thumbnail,
    }),
  });

  return response.data;
}
