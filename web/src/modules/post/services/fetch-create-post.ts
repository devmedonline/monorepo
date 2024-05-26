import { fetchApi } from "@/shared/lib/fetch-api";
import { CreateGeneralCategoryDto } from "../types/general-category";

export async function fetchCreateGeneralCategory(
  category: CreateGeneralCategoryDto
) {
  const response = await fetchApi("/general-category", {
    method: "POST",
    body: JSON.stringify(category),
  });

  return response.data;
}
