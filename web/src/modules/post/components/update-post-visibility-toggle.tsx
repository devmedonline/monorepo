import { Button, ButtonProps } from "@/shared/components/ui/button";
import { useToast } from "@/shared/components/ui/use-toast";
import { useTogglePostStatusMutation } from "../hooks/use-toggle-post-status-mutation";
import { Post } from "../types/post";

type updatePostVisibilityToggleProps = Pick<Post, "id" | "publicAvailable"> &
  Omit<ButtonProps, "onClick">;

export function UpdatePostVisibilityToggle({
  id,
  publicAvailable,
  ...rest
}: updatePostVisibilityToggleProps) {
  const { toast } = useToast();
  const togglePostStatusMutation = useTogglePostStatusMutation();

  const handleToggleVisibility = async () => {
    try {
      await togglePostStatusMutation.mutateAsync(id);
      toast({
        title: "Publicação atualizada com sucesso",
        variant: "success",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";

      toast({
        title: "Erro ao atualizar publicação",
        description: message,
        variant: "destructive",
      });
    }
  };

  return <Button onClick={handleToggleVisibility} {...rest} />;
}
