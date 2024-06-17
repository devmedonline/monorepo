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
import { useDeleteSimulationPhaseMutation } from "../hooks/use-delete-simulation-phase-mutation";

type SimulationPhaseDeleteTriggerProps = {
  simulationPhaseId: string;
  children: React.ReactNode;
};

export function SimulationPhaseDeleteTrigger({
  simulationPhaseId,
  children,
}: SimulationPhaseDeleteTriggerProps) {
  const deleteSimulationMutation = useDeleteSimulationPhaseMutation();

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
            Certeza que deseja excluir esta fase da simulação?
          </AlertDialogTitle>
          <AlertDialogDescription>
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteSimulationMutation.mutate(simulationPhaseId);
            }}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
