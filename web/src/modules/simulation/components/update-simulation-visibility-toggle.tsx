import { Button, ButtonProps } from "@/shared/components/ui/button";
import { useToast } from "@/shared/components/ui/use-toast";
import { useToggleSimulationStatusMutation } from "../hooks/use-toggle-simulation-status-mutation";
import { Simulation } from "../types/simulation";

type updateSimulationVisibilityToggleProps = Pick<
  Simulation,
  "id" | "publicAvailable"
> &
  Omit<ButtonProps, "onClick">;

export function UpdateSimulationVisibilityToggle({
  id,
  publicAvailable,
  ...rest
}: updateSimulationVisibilityToggleProps) {
  const { toast } = useToast();
  const toggleSimulationStatusMutation = useToggleSimulationStatusMutation();

  const handleToggleVisibility = async () => {
    try {
      await toggleSimulationStatusMutation.mutateAsync(id);
      toast({
        title: "Simulação atualizada com sucesso",
        variant: "success",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";

      toast({
        title: "Erro ao atualizar simulação",
        description: message,
        variant: "destructive",
      });
    }
  };

  return <Button onClick={handleToggleVisibility} {...rest} />;
}
