import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { useState } from "react";
import { useUpdateGeneralCategoryForm } from "../hooks/use-update-general-category-form";
import { GeneralCategory } from "../types/general-category";

export type UpdateGeneralCategoryFormProps = {
  onSuccess: () => void;
  defaultValues: GeneralCategory;
};

export function UpdateGeneralCategoryForm({
  onSuccess,
  defaultValues,
}: UpdateGeneralCategoryFormProps) {
  const { form, onSubmit } = useUpdateGeneralCategoryForm({
    onSuccess,
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="Categoria" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descrição</FormLabel>
              <FormControl>
                <Input placeholder="Descrição" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <Input placeholder="URL da imagem" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Salvar</Button>
      </form>
    </Form>
  );
}

type UpdateGeneralCategoryDialogTriggerProps = {
  children: React.ReactNode;
  defaultValues: GeneralCategory;
};
export function UpdateGeneralCategoryDialogTrigger({
  children,
  defaultValues,
}: UpdateGeneralCategoryDialogTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar categoria {defaultValues.name}</DialogTitle>
        </DialogHeader>

        <UpdateGeneralCategoryForm
          defaultValues={defaultValues}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
