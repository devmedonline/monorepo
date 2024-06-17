import { MediaPickerDialogTrigger } from "@/modules/media/components/media-picker-dialog-trigger";
import { TextEditor } from "@/modules/text-editor/components/text-editor";
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
import { useCreateSimulationPhaseForm } from "../hooks/use-create-simulation-phase-form";

export function CreateNewSimulationPhaseForm({
  onSuccess,
  simulationId,
}: {
  onSuccess: () => void;
  simulationId: string;
}) {
  const { form, onSubmit } = useCreateSimulationPhaseForm({
    onSuccess,
    simulationId,
  });

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
                <Input placeholder="Fase x de y" {...field} />
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
                <TextEditor
                  content={field.value}
                  onChange={(content) => {
                    field.onChange(JSON.stringify(content));
                  }}
                />
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

export function CreateNewSimulationPhaseDialogTrigger({
  children,
  simulationId,
}: {
  children: React.ReactNode;
  simulationId: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="min-w-[60dvw]">
        <DialogHeader>
          <DialogTitle>Criar nova fase de simulação</DialogTitle>
        </DialogHeader>

        <CreateNewSimulationPhaseForm
          simulationId={simulationId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
