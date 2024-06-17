import { useToast } from "@/shared/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { createSimulationPhaseFormSchema } from "./use-create-simulation-phase-form";
import { useSimulationPhaseQuery } from "./use-simulation-phase-query";
import { useUpdateSimulationPhaseMutation } from "./use-update-simulation-phase-mutation";

const formSchema = createSimulationPhaseFormSchema.extend({
  id: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export type UpdateSimulationPhaseFormProps = {
  onSuccess: () => void;
  simulationPhaseId: string;
};

export function useUpdateSimulationPhaseForm({
  onSuccess,
  simulationPhaseId,
}: UpdateSimulationPhaseFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const simulationPhaseQuery = useSimulationPhaseQuery(simulationPhaseId);

  useEffect(() => {
    if (simulationPhaseQuery.isSuccess) {
      const simulationPhase = simulationPhaseQuery.data;

      form.reset({
        id: simulationPhase.id,
        title: simulationPhase.title,
        content: simulationPhase.content,
        thumbnail: simulationPhase.thumbnail,
      });
    }
  }, [form, simulationPhaseQuery.data, simulationPhaseQuery.isSuccess]);

  const { toast } = useToast();

  const updateSimulationMutation = useUpdateSimulationPhaseMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      await updateSimulationMutation.mutateAsync({
        id: simulationPhaseId,
        simulation: values,
      });
      form.reset();
      toast({
        title: "Fase da simulação atualiazada com sucesso",
        variant: "success",
      });

      onSuccess();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";

      toast({
        title: "Erro ao atualizar fase simulação",
        description: message,
        variant: "destructive",
      });
    }
  };

  return {
    form,
    onSubmit,
  };
}
