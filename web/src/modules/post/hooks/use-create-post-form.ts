import { useToast } from "@/shared/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCreatePostMutation } from "../hooks/use-create-post-mutation";

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

export function useCreatePostForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const { toast } = useToast();
  const createPostMutation = useCreatePostMutation();

  const onSubmit = async (values: FormValues) => {
    try {
      await createPostMutation.mutateAsync(values);
      form.reset();
      toast({
        title: "Publicação criada com sucesso",
        variant: "success",
      });

      onSuccess();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido";

      toast({
        title: "Erro ao criar publicação",
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
