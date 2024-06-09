import { Button, ButtonProps } from "@/shared/components/ui/button";
import { useToast } from "@/shared/components/ui/use-toast";
import { useToggleSimulationCategoryStatusMutation } from "../hooks/use-toggle-simulation-category-status-mutation";
import { SimulationCategory } from "../types/simulation-category";

type updateSimulationCategoryVisibilityToggleProps = Pick<
  SimulationCategory,
  "id" | "publicAvailable"
> &
  Omit<ButtonProps, "onClick">;

export function UpdateSimulationCategoryVisibilityToggle({
  id,
  publicAvailable,
  ...rest
}: updateSimulationCategoryVisibilityToggleProps) {
  const { toast } = useToast();
  const toggleSimulationCategoryStatusMutation =
    useToggleSimulationCategoryStatusMutation();

  const handleToggleVisibility = async () => {
    try {
      await toggleSimulationCategoryStatusMutation.mutateAsync(id);
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
