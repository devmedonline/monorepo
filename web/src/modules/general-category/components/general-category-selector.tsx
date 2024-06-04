import { useDebouncedValue } from "@/shared/hooks/use-debounced-value";
import { forwardRef, useState } from "react";
import { useGeneralCategoryQuery } from "../hooks/use-general-category-search-query";

export const GeneralCategorySelector = forwardRef((props, ref) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const generalCategoriesQuery = useGeneralCategoryQuery({
    search: debouncedSearch,
    page: 1,
    take: 15,
  });

  return <search></search>;
});
GeneralCategorySelector.displayName = "GeneralCategorySelector";
