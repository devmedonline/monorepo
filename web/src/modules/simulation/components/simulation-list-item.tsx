import { PostPublicAvailable } from "@/modules/post/types/post";
import { CreateNewSimulationPhaseDialogTrigger } from "@/modules/simulation-phase/components/create-new-simulation-phase-form";
import { SimulationPhaseImageDropdownTrigger } from "@/modules/simulation-phase/components/simulation-phase-image-dropdown-trigger";
import { PublicationStatusBadge } from "@/shared/components/publication-status-badge";
import { Button } from "@/shared/components/ui/button";
import { LucidePlus } from "lucide-react";
import { Simulation } from "../types/simulation";
import { SimulationImageDropdownTrigger } from "./simulation-image-dropdown-trigger";

type SimulationListItemProps = {
  simulation: Simulation;
};

export function SimulationListItem({ simulation }: SimulationListItemProps) {
  return (
    <li className="flex flex-col gap-1 border rounded-2xl rounded-tl p-1">
      <div className="flex items-start gap-3">
        <SimulationImageDropdownTrigger simulation={simulation} />
        <div className="flex flex-col gap-1">
          <h3 className="text-base font-semibold text-primary line-clamp-2 leading-tight">
            {simulation.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {simulation.content}
          </p>
          <div className="flex items-start justify-between gap-2">
            <PublicationStatusBadge
              status={
                simulation.publicAvailable
                  ? PostPublicAvailable.Published
                  : PostPublicAvailable.Draft
              }
            />
          </div>
        </div>
      </div>

      <ol className="flex gap-2 items-start mt-2">
        {simulation.simulationPhases.length === 0 && (
          <li className="text-muted-foreground text-sm w-full">
            <CreateNewSimulationPhaseDialogTrigger simulationId={simulation.id}>
              <Button variant="outline" size="sm" className="w-full">
                Adicionar fase
              </Button>
            </CreateNewSimulationPhaseDialogTrigger>
          </li>
        )}

        {simulation.simulationPhases.map((phase) => (
          <li key={phase.id} className="h-fit">
            <SimulationPhaseImageDropdownTrigger simulationPhase={phase} />
          </li>
        ))}

        <CreateNewSimulationPhaseDialogTrigger simulationId={simulation.id}>
          <Button variant="outline" size="icon" className="h-16 w-16">
            <LucidePlus size={16} />
          </Button>
        </CreateNewSimulationPhaseDialogTrigger>
      </ol>
    </li>
  );
}
