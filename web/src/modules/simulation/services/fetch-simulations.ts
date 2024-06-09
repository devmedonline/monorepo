import { fetchApi } from "@/shared/lib/fetch-api";
import { PaginationInput } from "@/shared/types/pagination";
import { Simulation } from "../types/simulation";

export type SimulationsInput = PaginationInput;

export async function fetchSimulations(
  params: SimulationsInput = {}
): Promise<{ simulations: Simulation[] }> {
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

  const url = `/simulation?${searchParams.toString()}`;

  const response = await fetchApi<Simulation[]>(url, {
    method: "GET",
  });

  return {
    simulations: response.data,
  };
}
