import { fetchApi } from "@/shared/lib/fetch-api";
import { CreateSimulationDto } from "../types/simulation";

export async function fetchCreateSimulation(category: CreateSimulationDto) {
  const response = await fetchApi("/simulation", {
    method: "POST",
    body: JSON.stringify(category),
  });

  return response.data;
}
