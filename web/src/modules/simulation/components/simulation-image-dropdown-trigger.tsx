import Image from "next/image";
import { Simulation } from "../types/simulation";

import { Button } from "@/shared/components/ui/button";
import {
  ArrowDownRight,
  EyeIcon,
  EyeOffIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { SimulationDeleteTrigger } from "./simulation-delete-trigger";
import { UpdateSimulationDialogTrigger } from "./update-simulation-form";
import { UpdateSimulationVisibilityToggle } from "./update-simulation-visibility-toggle";

type SimulationImageDropdownTriggerProps = {
  simulation: Simulation;
};

export function SimulationImageDropdownTrigger({
  simulation,
}: SimulationImageDropdownTriggerProps) {
  const visibilityLabel = simulation.publicAvailable
    ? "Ocultar simulação"
    : "Exibir simulação";
  return (
    <button className="rounded-xl rounded-tl bg-secondary flex-shrink-0 cursor-pointer overflow-hidden relative group">
      <Image
        width={64}
        height={64}
        src={simulation.thumbnail}
        alt={simulation.title}
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

        <UpdateSimulationVisibilityToggle
          id={simulation.id}
          publicAvailable={simulation.publicAvailable}
          title={visibilityLabel}
          aria-label={visibilityLabel}
          variant={simulation.publicAvailable ? "destructive" : "default"}
          size="icon"
          className="w-full h-full rounded-none"
        >
          {simulation.publicAvailable ? (
            <EyeIcon size={16} />
          ) : (
            <EyeOffIcon size={16} />
          )}
        </UpdateSimulationVisibilityToggle>

        <UpdateSimulationDialogTrigger defaultValues={simulation}>
          <Button
            variant="secondary"
            size="icon"
            className="w-full h-full rounded-none"
            title="Editar simulação"
            aria-label="Editar simulação"
          >
            <PencilIcon size={16} />
          </Button>
        </UpdateSimulationDialogTrigger>

        <SimulationDeleteTrigger simulation={simulation}>
          <Button
            variant="destructive"
            size="icon"
            className="w-full h-full rounded-none"
            title="Excluir simulação"
            aria-label="Excluir simulação"
          >
            <Trash2Icon size={16} />
          </Button>
        </SimulationDeleteTrigger>
      </div>
    </button>
  );
}
