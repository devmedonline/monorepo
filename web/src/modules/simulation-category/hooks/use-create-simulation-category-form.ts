import { useToast } from "@/shared/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateSimulationCategoryMutation } from "../hooks/use-create-simulation-category-mutation";

const formSchema = z.object({
  name: z.string({
    required_error: "Nome é obrigatório",
  }),
  description: z.string({
    required_error: "Descrição é obrigatória",
  }),
  thumbnail: z.string({
    required_error: "Thumbnail é obrigatória",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function useCreateSimulationCategoryForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { toast } = useToast();
  const createSimulationCategoryMutation =
    useCreateSimulationCategoryMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      await createSimulationCategoryMutation.mutateAsync(values);
      form.reset();
      toast({
        title: "Categoria criada com sucesso",
        variant: "success",
      });

      onSuccess();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";

      toast({
        title: "Erro ao criar categoria",
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
