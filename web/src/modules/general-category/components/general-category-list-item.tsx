import { GeneralCategory } from "../types/general-category";
import { GeneralCategoryImageDropdownTrigger } from "./general-category-image-dropdown-trigger";

type GeneralCategoryListItemProps = {
  generalCategory: GeneralCategory;
};

export function GeneralCategoryListItem({
  generalCategory,
}: GeneralCategoryListItemProps) {
  return (
    <li className="flex items-center gap-3">
      <GeneralCategoryImageDropdownTrigger generalCategory={generalCategory} />
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-primary line-clamp-2 leading-tight">
          {generalCategory.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {generalCategory.description}
        </p>
      </div>
    </li>
  );
}
