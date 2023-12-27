import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog";
import { useToast } from "@/shared/components/ui/use-toast";
import { useState } from "react";
import { updatePassword } from "../../services/update-password";
import { UpdatePasswordForm, UpdatePasswordFormValues } from "./update-password-form";

type UpdatePasswordFormDialogTriggerProps = { children: React.ReactNode };

export function UpdatePasswordFormDialogTrigger({ children }: UpdatePasswordFormDialogTriggerProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const onSubmitValues = async (values: UpdatePasswordFormValues) => {
    try {
      const result = await updatePassword(values);

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
          <DialogTitle className="max-w-fit p-0">Alterar senha</DialogTitle>
        </DialogHeader>
        <UpdatePasswordForm onSubmit={onSubmitValues} />
      </DialogContent>
    </Dialog>
  );
}
