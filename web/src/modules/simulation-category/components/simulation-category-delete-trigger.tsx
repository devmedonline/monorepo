import { useDeleteSimulationCategoryMutation } from "../hooks/use-delete-simulation-category-mutation";
import { SimulationCategory } from "../types/simulation-category";

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

type SimulationCategoryDeleteTriggerProps = {
  simulationCategory: Pick<
    SimulationCategory,
    "id" | "thumbnail" | "name" | "description"
  >;
  children: React.ReactNode;
};

export function SimulationCategoryDeleteTrigger({
  simulationCategory,
  children,
}: SimulationCategoryDeleteTriggerProps) {
  const deleteSimulationCategoryMutation =
    useDeleteSimulationCategoryMutation();

  const { toast } = useToast();

  useEffect(() => {
    if (deleteSimulationCategoryMutation.isSuccess) {
      toast({
        title: "Categoria excluída com sucesso",
        variant: "success",
      });
    }

    if (deleteSimulationCategoryMutation.error) {
      toast({
        title: "Erro ao excluir categoria",
        description: deleteSimulationCategoryMutation.error.message,
        variant: "destructive",
      });
    }
  }, [
    deleteSimulationCategoryMutation.error,
    deleteSimulationCategoryMutation.isSuccess,
    toast,
  ]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Certeza que deseja excluir a categoria {simulationCategory.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            A categoria {simulationCategory.name} será excluída permanentemente.
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteSimulationCategoryMutation.mutate(simulationCategory.id);
            }}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
