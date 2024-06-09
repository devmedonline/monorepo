import { fetchApi } from "@/shared/lib/fetch-api";
import { CreateSimulationCategoryDto } from "../types/simulation-category";

export async function fetchCreateSimulationCategory(
  category: CreateSimulationCategoryDto
) {
  const response = await fetchApi("/simulation-category", {
    method: "POST",
    body: JSON.stringify(category),
  });

  return response.data;
}
