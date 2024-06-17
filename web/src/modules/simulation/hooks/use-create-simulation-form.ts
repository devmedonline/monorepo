import { PostPublicAvailable } from "@/modules/post/types/post";
import { useToast } from "@/shared/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateSimulationMutation } from "../hooks/use-create-simulation-mutation";

export const createSimulationFormSchema = z.object({
  title: z.string({
    required_error: "O título é obrigatório",
  }),
  content: z.string({
    required_error: "Conteúdo é obrigatório",
  }),
  thumbnail: z.string({
    required_error: "Thumbnail é obrigatória",
  }),
  publicAvailable: z
    .union([z.literal("draft"), z.literal("published")], {
      message: "Estado de publicação inválido",
    })
    .default("draft"),
  simulationCategoryId: z.string({
    required_error: "Associação com uma categoria de simulação é obrigatória",
  }),
});

type FormValues = z.infer<typeof createSimulationFormSchema>;

type CreateSimulationFormProps = {
  onSuccess: () => void;
};

export function useCreateSimulationForm({
  onSuccess,
}: CreateSimulationFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(createSimulationFormSchema),
  });

  const { toast } = useToast();
  const createSimulationMutation = useCreateSimulationMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      await createSimulationMutation.mutateAsync({
        ...values,
        publicAvailable:
          values.publicAvailable === PostPublicAvailable.Published,
      });
      form.reset();
      toast({
        title: "Simulação criada com sucesso... vá em frente e adicione fases!",
        variant: "success",
      });

      onSuccess();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";

      toast({
        title: "Erro ao criar simulação",
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
