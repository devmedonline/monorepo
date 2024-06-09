import { fetchApi } from "@/shared/lib/fetch-api";
import { PaginationInput } from "@/shared/types/pagination";
import { SimulationCategory } from "../types/simulation-category";

export type SimulationCategoriesInput = PaginationInput;

export async function fetchSimulationCategories(
  params: SimulationCategoriesInput = {}
): Promise<{ simulationCategories: SimulationCategory[] }> {
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

  const url = `/simulation-category?${searchParams.toString()}`;

  const response = await fetchApi<SimulationCategory[]>(url, {
    method: "GET",
  });

  return {
    simulationCategories: response.data,
  };
}
