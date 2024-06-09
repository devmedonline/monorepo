import Image from "next/image";
import { SimulationCategory } from "../types/simulation-category";

import { Button } from "@/shared/components/ui/button";
import {
  ArrowDownRight,
  EyeIcon,
  EyeOffIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { SimulationCategoryDeleteTrigger } from "./simulation-category-delete-trigger";
import { UpdateSimulationCategoryDialogTrigger } from "./update-simulation-category-form";
import { UpdateSimulationCategoryVisibilityToggle } from "./update-simulation-category-visibility-toggle";

type SimulationCategoryImageDropdownTriggerProps = {
  simulationCategory: SimulationCategory;
};

export function SimulationCategoryImageDropdownTrigger({
  simulationCategory,
}: SimulationCategoryImageDropdownTriggerProps) {
  const visibilityLabel = simulationCategory.publicAvailable
    ? "Ocultar categoria"
    : "Exibir categoria";
  return (
    <button className="rounded-xl rounded-tl bg-secondary flex-shrink-0 cursor-pointer overflow-hidden relative group">
      <Image
        width={64}
        height={64}
        src={simulationCategory.thumbnail}
        alt={simulationCategory.name}
        className="aspect-square object-cover"
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity grid grid-cols-2 grid-rows-2">
        <span
          className="w-full h-full flex items-center justify-center text-white"
          title="Ver detalhes"
          aria-label="Ver detalhes"
        >
          <ArrowDownRight size={16} />
        </span>

        <UpdateSimulationCategoryVisibilityToggle
          id={simulationCategory.id}
          publicAvailable={simulationCategory.publicAvailable}
          title={visibilityLabel}
          aria-label={visibilityLabel}
          variant={
            simulationCategory.publicAvailable ? "destructive" : "default"
          }
          size="icon"
          className="w-full h-full rounded-none"
        >
          {simulationCategory.publicAvailable ? (
            <EyeIcon size={16} />
          ) : (
            <EyeOffIcon size={16} />
          )}
        </UpdateSimulationCategoryVisibilityToggle>

        <UpdateSimulationCategoryDialogTrigger
          defaultValues={simulationCategory}
        >
          <Button
            variant="secondary"
            size="icon"
            className="w-full h-full rounded-none"
            title="Editar categoria"
            aria-label="Editar categoria"
          >
            <PencilIcon size={16} />
          </Button>
        </UpdateSimulationCategoryDialogTrigger>

        <SimulationCategoryDeleteTrigger
          simulationCategory={simulationCategory}
        >
          <Button
            variant="destructive"
            size="icon"
            className="w-full h-full rounded-none"
            title="Excluir categoria"
            aria-label="Excluir categoria"
          >
            <Trash2Icon size={16} />
          </Button>
        </SimulationCategoryDeleteTrigger>
      </div>
    </button>
  );
}
