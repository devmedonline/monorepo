import { PostPublicAvailable } from "@/modules/post/types/post";
import { useToast } from "@/shared/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Simulation } from "../types/simulation";
import { createSimulationFormSchema } from "./use-create-simulation-form";
import { useUpdateSimulationMutation } from "./use-update-simulation-mutation";

const formSchema = createSimulationFormSchema.extend({
  id: z.string(),
});

type FormValues = z.infer<typeof formSchema>;

export type UpdateSimulationFormProps = {
  onSuccess: () => void;
  defaultValues: Simulation;
};

export function useUpdateSimulationForm({
  onSuccess,
  defaultValues,
}: UpdateSimulationFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: defaultValues.id,
      title: defaultValues.title,
      content: defaultValues.content,
      thumbnail: defaultValues.thumbnail,
      publicAvailable: defaultValues.publicAvailable
        ? PostPublicAvailable.Published
        : PostPublicAvailable.Draft,
      simulationCategoryId: defaultValues.simulationCategoryId,
    },
  });

  const { toast } = useToast();
  const updateSimulationMutation = useUpdateSimulationMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      await updateSimulationMutation.mutateAsync({
        id: defaultValues.id,
        simulation: {
          ...defaultValues,
          ...values,
          publicAvailable:
            values.publicAvailable === PostPublicAvailable.Published,
        },
      });
      form.reset();
      toast({
        title: "Simulação atualiazada com sucesso",
        variant: "success",
      });

      onSuccess();
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

  return {
    form,
    onSubmit,
  };
}
