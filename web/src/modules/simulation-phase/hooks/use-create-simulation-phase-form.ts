import { useToast } from "@/shared/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateSimulationPhaseMutation } from "../hooks/use-create-simulation-phase-mutation";

export const createSimulationPhaseFormSchema = z.object({
  title: z.string({
    required_error: "O título é obrigatório",
  }),
  content: z.string({
    required_error: "Conteúdo é obrigatório",
  }),
  thumbnail: z.string({
    required_error: "Thumbnail é obrigatória",
  }),
});

type FormValues = z.infer<typeof createSimulationPhaseFormSchema>;

type CreateSimulationPhaseFormProps = {
  onSuccess: () => void;
  simulationId: string;
};

export function useCreateSimulationPhaseForm({
  onSuccess,
  simulationId,
}: CreateSimulationPhaseFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(createSimulationPhaseFormSchema),
  });

  const { toast } = useToast();
  const createSimulationPhaseMutation = useCreateSimulationPhaseMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      await createSimulationPhaseMutation.mutateAsync({
        ...values,
        simulationId,
      });

      form.reset();
      toast({
        title: "Fase de simulação criada!",
        variant: "success",
      });

      onSuccess();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";

      toast({
        title: "Erro ao criar fase de simulação",
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
