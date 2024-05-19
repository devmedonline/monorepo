import { useToast } from "@/shared/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreateGeneralCategoryMutation } from "../hooks/use-create-general-category-mutation";

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

export function useCreateGeneralCategoryForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { toast } = useToast();
  const createGeneralCategoryMutation = useCreateGeneralCategoryMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      await createGeneralCategoryMutation.mutateAsync(values);
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
