import { useToast } from "@/shared/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UpdateSimulationCategoryFormProps } from "../components/update-simulation-category-form";
import { useUpdateSimulationCategoryMutation } from "./use-update-simulation-category-mutation";

const formSchema = z.object({
  name: z.string({
    invalid_type_error: "Nome é obrigatório",
  }),
  description: z.string({
    invalid_type_error: "Descrição é obrigatória",
  }),
  thumbnail: z.string({
    invalid_type_error: "Thumbnail é obrigatória",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function useUpdateSimulationCategoryForm({
  onSuccess,
  defaultValues,
}: UpdateSimulationCategoryFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { toast } = useToast();
  const updateSimulationCategoryMutation =
    useUpdateSimulationCategoryMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      await updateSimulationCategoryMutation.mutateAsync({
        category: {
          ...defaultValues,
          ...values,
        },
        id: defaultValues.id,
      });
      form.reset();
      toast({
        title: "Categoria atualizada com sucesso",
        variant: "success",
      });

      onSuccess();
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

  return {
    form,
    onSubmit,
  };
}
