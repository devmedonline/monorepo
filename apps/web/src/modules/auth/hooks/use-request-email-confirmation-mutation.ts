import { requestEmailConfirmation } from '@/modules/auth/services/request-email-confirmation';
import { useToast } from '@/shared/components/ui/use-toast';
import { useMutation } from '@tanstack/react-query';

export function useRequestEmailConfirmationMutation() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: requestEmailConfirmation,
    onError: (error) => {
      toast({
        variant: 'destructive',
        title: 'Algo deu errado',
        description: error.message,
      });
    },
    onSuccess: (data) => {
      toast({
        title: 'Sucesso!',
        description: data.message,
      });
    },
  });
}
