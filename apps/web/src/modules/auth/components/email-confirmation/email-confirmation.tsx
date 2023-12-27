import { Button } from "@/shared/components/ui/button";
import { useRequestEmailConfirmationMutation } from "../../hooks/use-request-email-confirmation-mutation";
import { MailCheckIcon } from "lucide-react";

export function EmailConfirmation() {
  const requestEmailConfirmationMutation = useRequestEmailConfirmationMutation();

  return (
    <Button
      type="submit"
      variant="secondary"
      onClick={() => {
        requestEmailConfirmationMutation.mutate();
      }}
      loading={requestEmailConfirmationMutation.isPending}
      data-testid="email-confirmation"
      className="w-full lg:w-fit gap-2 items-center flex group"
    >
      <MailCheckIcon className="group-hover:animate-tickle" size={24} />
      {requestEmailConfirmationMutation.isSuccess ? "Verifique o código no seu e-mail" : "Confirmar E-mail"}
    </Button>
  );
}
