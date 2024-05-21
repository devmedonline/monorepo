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
import { useDeleteMediaMutation } from "../hooks/use-delete-media-mutation";
import { Media } from "../types/media";

type MediaDeleteTriggerProps = {
  media: Media;
  children: React.ReactNode;
};

export function MediaDeleteTrigger({
  media,
  children,
}: MediaDeleteTriggerProps) {
  const deleteMediaMutation = useDeleteMediaMutation();

  const { toast } = useToast();

  useEffect(() => {
    if (deleteMediaMutation.isSuccess) {
      toast({
        title: "Categoria excluída com sucesso",
        variant: "success",
      });
    }

    if (deleteMediaMutation.error) {
      toast({
        title: "Erro ao excluir categoria",
        description: deleteMediaMutation.error.message,
        variant: "destructive",
      });
    }
  }, [deleteMediaMutation.error, deleteMediaMutation.isSuccess, toast]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Certeza que deseja excluir a mídia {media.id}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            A categoria {media.id} será excluída permanentemente. Esta ação não
            pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deleteMediaMutation.mutate(media.id);
            }}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
