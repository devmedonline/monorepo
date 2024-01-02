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
import { cn } from '@/shared/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClassValue } from 'clsx';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { emailSchema } from '../../schemas/email-schema';
import { passwordSchema } from '../../schemas/password-schema';

const formSchema = z.object({
  newEmail: emailSchema,
  password: passwordSchema,
});

export type ChangeEmailFormValues = z.infer<typeof formSchema>;

type ChangeEmailFormProps = {
  className?: ClassValue;
  onSubmit: (values: ChangeEmailFormValues) => Promise<void>;
};

export function ChangeEmailForm({ className, onSubmit }: ChangeEmailFormProps) {
  const form = useForm<ChangeEmailFormValues>({
    resolver: zodResolver(formSchema),
  });
  return (
    <Form {...form}>
      <form
        data-testid="user-sign-in-form"
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('w-full space-y-2', className)}
      >
        <FormField
          control={form.control}
          name="newEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Novo e-mail</FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="example@gmail.com"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Digite sua Senha</FormLabel>
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
        <Button type="submit" className="w-full">
          Alterar e-mail
        </Button>
      </form>
    </Form>
  );
}
