import { useDeletePostMutation } from "../hooks/use-delete-post-mutation";
import { Post } from "../types/post";

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

type PostDeleteTriggerProps = {
  post: Pick<Post, "id" | "thumbnail" | "name" | "description">;
  children: React.ReactNode;
};

export function PostDeleteTrigger({ post, children }: PostDeleteTriggerProps) {
  const deletePostMutation = useDeletePostMutation();

  const { toast } = useToast();

  useEffect(() => {
    if (deletePostMutation.isSuccess) {
      toast({
        title: "Publicação excluída com sucesso",
        variant: "success",
      });
    }

    if (deletePostMutation.error) {
      toast({
        title: "Erro ao excluir publicação",
        description: deletePostMutation.error.message,
        variant: "destructive",
      });
    }
  }, [deletePostMutation.error, deletePostMutation.isSuccess, toast]);

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Certeza que deseja excluir a publicação {post.name}?
          </AlertDialogTitle>
          <AlertDialogDescription>
            A publicação {post.name} será excluída permanentemente. Esta ação
            não pode ser desfeita.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              deletePostMutation.mutate(post.id);
            }}
          >
            Continuar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
