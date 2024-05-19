import { useToast } from "@/shared/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UpdateGeneralCategoryFormProps } from "../components/update-general-category-form";
import { useUpdateGeneralCategoryMutation } from "./use-update-general-category-mutation";

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

export function useUpdateGeneralCategoryForm({
  onSuccess,
  defaultValues,
}: UpdateGeneralCategoryFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { toast } = useToast();
  const updateGeneralCategoryMutation = useUpdateGeneralCategoryMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      await updateGeneralCategoryMutation.mutateAsync({
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
