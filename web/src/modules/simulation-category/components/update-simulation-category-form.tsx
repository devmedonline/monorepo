import { MediaPickerDialogTrigger } from "@/modules/media/components/media-picker-dialog-trigger";
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
import { useUpdateSimulationCategoryForm } from "../hooks/use-update-simulation-category-form";
import { SimulationCategory } from "../types/simulation-category";

export type UpdateSimulationCategoryFormProps = {
  onSuccess: () => void;
  defaultValues: SimulationCategory;
};

export function UpdateSimulationCategoryForm({
  onSuccess,
  defaultValues,
}: UpdateSimulationCategoryFormProps) {
  const { form, onSubmit } = useUpdateSimulationCategoryForm({
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
          render={() => (
            <FormItem>
              <FormLabel>Thumbnail</FormLabel>
              <FormControl>
                <MediaPickerDialogTrigger
                  media={{ url: defaultValues.thumbnail }}
                  onPick={(media) => form.setValue("thumbnail", media.url)}
                >
                  <Button type="button">Selecionar thumbnail</Button>
                </MediaPickerDialogTrigger>
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

type UpdateSimulationCategoryDialogTriggerProps = {
  children: React.ReactNode;
  defaultValues: SimulationCategory;
};
export function UpdateSimulationCategoryDialogTrigger({
  children,
  defaultValues,
}: UpdateSimulationCategoryDialogTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar categoria {defaultValues.name}</DialogTitle>
        </DialogHeader>

        <UpdateSimulationCategoryForm
          defaultValues={defaultValues}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
