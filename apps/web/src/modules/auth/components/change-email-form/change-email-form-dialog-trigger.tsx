import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { useToast } from "@/shared/components/ui/use-toast";
import { useState } from "react";
import { ChangeEmailForm, ChangeEmailFormValues } from ".";
import { changeEmail } from "../../services/change-email";

type ChangeEmailFormDialogTriggerProps = { children: React.ReactNode };

export function ChangeEmailFormDialogTrigger({ children }: ChangeEmailFormDialogTriggerProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const onSubmitValues = async (values: ChangeEmailFormValues) => {
    try {
      const result = await changeEmail(values);

      toast({
        title: "Sucesso!",
        description: result.message,
        variant: "success",
      });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Um erro ocorreu!";

      toast({
        title: "Algo deu errado! Tente novamente.",
        description: errorMessage,
        variant: "destructive",
      });
    }
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar e-mail</DialogTitle>
        </DialogHeader>
        <ChangeEmailForm onSubmit={onSubmitValues} />
      </DialogContent>
    </Dialog>
  );
}
