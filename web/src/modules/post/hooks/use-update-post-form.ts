import { useToast } from "@/shared/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { UpdatePostFormProps } from "../components/update-post-form";
import { useUpdatePostMutation } from "./use-update-post-mutation";

const formSchema = z.object({
  title: z.string({ required_error: "Título é obrigatório" }),
  content: z.string({ required_error: "Conteúdo é obrigatório" }),
  thumbnail: z
    .string({ required_error: "Thumbnail é obrigatória" })
    .url("Deve ser uma URL de imagem válida"),
  publicAvailable: z
    .union([z.literal("draft"), z.literal("published"), z.literal("any")], {
      message: "Estado de publicação inválido",
    })
    .default("any"),
  generalCategoryId: z.string({
    required_error: "Associação com uma categoria é obrigatória",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export function useUpdatePostForm({
  onSuccess,
  defaultValues,
}: UpdatePostFormProps) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const { toast } = useToast();
  const updatePostMutation = useUpdatePostMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      await updatePostMutation.mutateAsync({
        post: {
          ...defaultValues,
          ...values,
        },
        id: defaultValues.id,
      });
      form.reset();
      toast({
        title: "Publicação atualizada com sucesso",
        variant: "success",
      });

      onSuccess();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";

      toast({
        title: "Erro ao atualizar publicação",
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
