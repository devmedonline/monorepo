import { Button } from "@/shared/components/ui/button";
import { ArrowDownRight, PencilIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import { SimulationPhaseEssentialData } from "../types/simulation-phase";
import { SimulationPhaseDeleteTrigger } from "./simulation-phase-delete-trigger";
import { UpdateSimulationPhaseDialogTrigger } from "./update-simulation-phase-form";

type SimulationPhaseImageDropdownTriggerProps = {
  simulationPhase: SimulationPhaseEssentialData;
};

export function SimulationPhaseImageDropdownTrigger({
  simulationPhase,
}: SimulationPhaseImageDropdownTriggerProps) {
  return (
    <button className="rounded-xl bg-secondary flex-shrink-0 cursor-pointer overflow-hidden relative group">
      <Image
        width={64}
        height={64}
        src={simulationPhase.thumbnail}
        alt={simulationPhase.title}
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

        <UpdateSimulationPhaseDialogTrigger
          simulation={simulationPhase}
          simulationPhaseId={simulationPhase.id}
        >
          <Button
            variant="secondary"
            size="icon"
            className="w-full h-full rounded-none"
            title="Editar simulação"
            aria-label="Editar simulação"
          >
            <PencilIcon size={16} />
          </Button>
        </UpdateSimulationPhaseDialogTrigger>

        <SimulationPhaseDeleteTrigger simulationPhaseId={simulationPhase.id}>
          <Button
            variant="destructive"
            size="icon"
            className="w-full h-full rounded-none"
            title="Excluir simulação"
            aria-label="Excluir simulação"
          >
            <Trash2Icon size={16} />
          </Button>
        </SimulationPhaseDeleteTrigger>
      </div>
    </button>
  );
}
