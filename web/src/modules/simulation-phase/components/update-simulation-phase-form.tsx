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
import { useUpdateSimulationPhaseForm } from "../hooks/use-update-simulation-phase-form";
import { SimulationPhaseEssentialData } from "../types/simulation-phase";

export type UpdateSimulationPhaseFormProps = {
  onSuccess: () => void;
  simulationPhaseId: string;
};

export function UpdateSimulationPhaseForm({
  onSuccess,
  simulationPhaseId,
}: UpdateSimulationPhaseFormProps) {
  const { form, onSubmit } = useUpdateSimulationPhaseForm({
    onSuccess,
    simulationPhaseId,
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

type UpdateSimulationPhaseDialogTriggerProps = {
  children: React.ReactNode;
  simulationPhaseId: string;
  simulation: SimulationPhaseEssentialData;
};
export function UpdateSimulationPhaseDialogTrigger({
  children,
  simulationPhaseId,
  simulation,
}: UpdateSimulationPhaseDialogTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Atualizar {simulation.title}</DialogTitle>
        </DialogHeader>

        <UpdateSimulationPhaseForm
          simulationPhaseId={simulationPhaseId}
          onSuccess={() => setIsOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
