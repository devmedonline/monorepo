import { MediaPickerDialogTrigger } from "@/modules/media/components/media-picker-dialog-trigger";
import { PostPublicAvailable } from "@/modules/post/types/post";
import { SimulationCategorySelector } from "@/modules/simulation-category/components/simulation-category-selector";
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
import { RadioGroup, RadioGroupItem } from "@/shared/components/ui/radio-group";
import { useState } from "react";
import { useCreateSimulationForm } from "../hooks/use-create-simulation-form";

export function CreateNewSimulationForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const { form, onSubmit } = useCreateSimulationForm({ onSuccess });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-6"
      >
        <FormField
          control={form.control}
          name="title"
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
          name="content"
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
          name="simulationCategoryId"
          render={({ field }) => (
            <FormItem className="space-y-3 flex flex-col">
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <SimulationCategorySelector
                  value={field.value}
                  onChange={(category) => field.onChange(category.id)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="publicAvailable"
          render={({ field }) => (
            <FormItem className="space-y-3">
              <FormLabel>Estado de publicação</FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="flex flex-row flex-wrap gap-4"
                >
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={PostPublicAvailable.Draft} />
                    </FormControl>
                    <FormLabel className="font-normal">Rascunho</FormLabel>
                  </FormItem>
                  <FormItem className="flex items-center space-x-2 space-y-0">
                    <FormControl>
                      <RadioGroupItem value={PostPublicAvailable.Published} />
                    </FormControl>
                    <FormLabel className="font-normal">Publicado</FormLabel>
                  </FormItem>
                </RadioGroup>
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
              <FormControl className="w-full">
                <MediaPickerDialogTrigger
                  onPick={(media) => form.setValue("thumbnail", media.url)}
                >
                  <Button type="button" className="w-full" variant="outline">
                    Selecionar thumbnail
                  </Button>
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

export function CreateNewSimulationDialogTrigger({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Criar nova simulação</DialogTitle>
        </DialogHeader>

        <CreateNewSimulationForm onSuccess={() => setIsOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}
