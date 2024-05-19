import { fetchApi } from "@/shared/lib/fetch-api";
import { GeneralCategory } from "../types/general-category";

export type GeneralCategoriesInput = {
  search?: string;
  page?: number;
  take?: number;
};

export async function fetchGeneralCategories(
  params: GeneralCategoriesInput = {}
): Promise<{ generalCategories: GeneralCategory[] }> {
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

  const url = `/general-category?${searchParams.toString()}`;

  const response = await fetchApi<GeneralCategory[]>(url, {
    method: "GET",
  });

  return {
    generalCategories: response.data,
  };
}
