import { Button, ButtonProps } from "@/shared/components/ui/button";
import { useToast } from "@/shared/components/ui/use-toast";
import { useToggleGeneralCategoryStatusMutation } from "../hooks/use-toggle-general-category-status-mutation";
import { GeneralCategory } from "../types/general-category";

type updateGeneralCategoryVisibilityToggleProps = Pick<
  GeneralCategory,
  "id" | "publicAvailable"
> &
  Omit<ButtonProps, "onClick">;

export function UpdateGeneralCategoryVisibilityToggle({
  id,
  publicAvailable,
  ...rest
}: updateGeneralCategoryVisibilityToggleProps) {
  const { toast } = useToast();
  const toggleGeneralCategoryStatusMutation =
    useToggleGeneralCategoryStatusMutation();

  const handleToggleVisibility = async () => {
    try {
      await toggleGeneralCategoryStatusMutation.mutateAsync(id);
      toast({
        title: "Categoria atualizada com sucesso",
        variant: "success",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";

      toast({
        title: "Erro ao atualizar categoria",
        description: message,
        variant: "destructive",
      });
    }
  };

  return <Button onClick={handleToggleVisibility} {...rest} />;
}
