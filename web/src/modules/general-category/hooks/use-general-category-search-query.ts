import { useQuery } from "@tanstack/react-query";
import {
  GeneralCategoriesInput,
  fetchGeneralCategories,
} from "../services/fetch-general-categories";

export const GENERAL_CATEGORY_QUERY_KEY = "GENERAL_CATEGORY_QUERY_KEY";

export function useGeneralCategoryQuery(params: GeneralCategoriesInput) {
  return useQuery({
    queryKey: [GENERAL_CATEGORY_QUERY_KEY, params],
    queryFn: () => fetchGeneralCategories(params),
  });
}
