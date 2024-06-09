import { useQuery } from "@tanstack/react-query";
import {
  SimulationCategoriesInput,
  fetchSimulationCategories,
} from "../services/fetch-simulation-categories";

export const SIMULATION_CATEGORY_QUERY_KEY = "SIMULATION_CATEGORY_QUERY_KEY";

export function useSimulationCategoryQuery(params: SimulationCategoriesInput) {
  return useQuery({
    queryKey: [SIMULATION_CATEGORY_QUERY_KEY, params],
    queryFn: () => fetchSimulationCategories(params),
  });
}
