import { useDeleteGeneralCategoryMutation } from "../hooks/use-delete-general-category-mutation";
import { GeneralCategory } from "../types/general-category";

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

type GeneralCategoryDeleteTriggerProps = {
  generalCategory: Pick<
    GeneralCategory,
    "id" | "thumbnail" | "name" | "description"
  >;
  children: React.ReactNode;
};

export function GeneralCategoryDeleteTrigger({
  generalCategory,
  children,
}: GeneralCategoryDeleteTriggerProps) {
  const deleteGeneralCategoryMutation = useDeleteGeneralCategoryMutation();

  const { toast } = useToast();

  useEffect(() => {
    if (deleteGeneralCategoryMutation.isSuccess) {
      toast({
        title: "Categoria excluída com sucesso",
        variant: "success",
      });
    }

    if (deleteGeneralCategoryMutation.error) {
      toast({
        title: "Erro ao excluir categoria",
        description: deleteGeneralCategoryMutation.error.message,
        variant: "destructive",
      });
    }
  }, [
    deleteGeneralCategoryMutation.error,
    deleteGeneralCategoryMutation.isSuccess,
    toast,
  ]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Certeza que deseja excluir a categoria {generalCategory.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            A categoria {generalCategory.name} será excluída permanentemente.
            Esta ação não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteGeneralCategoryMutation.mutate(generalCategory.id);
            }}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
