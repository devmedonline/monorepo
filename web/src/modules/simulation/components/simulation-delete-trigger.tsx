import { useDeleteSimulationMutation } from "../hooks/use-delete-simulation-mutation";
import { Simulation } from "../types/simulation";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shared/components/ui/alert-dialog";
import { useToast } from "@/shared/components/ui/use-toast";
import { useEffect } from "react";

type SimulationDeleteTriggerProps = {
  simulation: Pick<Simulation, "id" | "title">;
  children: React.ReactNode;
};

export function SimulationDeleteTrigger({
  simulation,
  children,
}: SimulationDeleteTriggerProps) {
  const deleteSimulationMutation = useDeleteSimulationMutation();

  const { toast } = useToast();

  useEffect(() => {
    if (deleteSimulationMutation.isSuccess) {
      toast({
        title: "Categoria excluída com sucesso",
        variant: "success",
      });
    }

    if (deleteSimulationMutation.error) {
      toast({
        title: "Erro ao excluir simulação",
        description: deleteSimulationMutation.error.message,
        variant: "destructive",
      });
    }
  }, [
    deleteSimulationMutation.error,
    deleteSimulationMutation.isSuccess,
    toast,
  ]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Certeza que deseja excluir a simulação {simulation.title}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            A simulação {simulation.title} será excluída permanentemente. Esta
            ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteSimulationMutation.mutate(simulation.id);
            }}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
