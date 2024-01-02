import { Button } from '@/shared/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/shared/components/ui/form';
import { Input } from '@/shared/components/ui/input';
import { useVibrateOnFormError } from '@/shared/hooks/use-vibrate-on-form-error';
import { cn } from '@/shared/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClassValue } from 'clsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { passwordSchema } from '../../schemas/password-schema';

const formSchema = z
  .object({
    oldPassword: passwordSchema,
    newPassword: passwordSchema,
    newPasswordConfirmation: passwordSchema,
  })
  .refine((data) => data.newPassword !== data.oldPassword, {
    message: 'A nova senha não pode ser igual a anterior',
    path: ['newPassword'],
  })
  .refine((data) => data.newPassword === data.newPasswordConfirmation, {
    message: 'As senhas não coincidem',
    path: ['newPasswordConfirmation'],
  });

export type UpdatePasswordFormValues = z.infer<typeof formSchema>;

type UpdatePasswordFormProps = {
  className?: ClassValue;
  onSubmit: (values: UpdatePasswordFormValues) => Promise<void>;
};

export function UpdatePasswordForm({
  className,
  onSubmit,
}: UpdatePasswordFormProps) {
  const form = useForm<UpdatePasswordFormValues>({
    resolver: zodResolver(formSchema),
  });

  useVibrateOnFormError(form.formState.errors);

  return (
    <Form {...form}>
      <form
        data-testid="update-password-form"
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('w-full space-y-2', className)}
      >
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha atual</FormLabel>
              <FormControl>
                <Input
                  autoComplete="current-password"
                  type="password"
                  placeholder="********"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nova Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="newPasswordConfirmation"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar Nova Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="********" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-fit p-3">
          Alterar senha
        </Button>
      </form>
    </Form>
  );
}
