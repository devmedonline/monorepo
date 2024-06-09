import { PostPublicAvailable } from "@/modules/post/types/post";
import { PublicationStatusBadge } from "@/shared/components/publication-status-badge";
import { SimulationCategory } from "../types/simulation-category";
import { SimulationCategoryImageDropdownTrigger } from "./simulation-category-image-dropdown-trigger";

type SimulationCategoryListItemProps = {
  simulationCategory: SimulationCategory;
};

export function SimulationCategoryListItem({
  simulationCategory,
}: SimulationCategoryListItemProps) {
  return (
    <li className="flex items-center gap-3">
      <SimulationCategoryImageDropdownTrigger
        simulationCategory={simulationCategory}
      />
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-primary line-clamp-2 leading-tight">
          {simulationCategory.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {simulationCategory.description}
        </p>
        <div className="flex items-start justify-between gap-2">
          <PublicationStatusBadge
            status={
              simulationCategory.publicAvailable
                ? PostPublicAvailable.Published
                : PostPublicAvailable.Draft
            }
          />
        </div>
      </div>
    </li>
  );
}
