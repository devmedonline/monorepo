'use client';

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
import { Separator } from '@/shared/components/ui/separator';
import { useToast } from '@/shared/components/ui/use-toast';
import { useVibrateOnFormError } from '@/shared/hooks/use-vibrate-on-form-error';
import { cn } from '@/shared/lib/utils';
import { zodResolver } from '@hookform/resolvers/zod';
import { ClassValue } from 'clsx';
import Link from 'next/link';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRedirectAfterAuth } from '../../hooks/use-redirect-after-auth';
import { signInSchema } from '../../schemas/sign-in-schema';
import { userSignUp } from '../../services/user-sign-up';
import { PasswordRecoveryLink } from '../password-recovery-link';

const formSchema = signInSchema.extend({
  name: z.string().min(3, { message: 'Nome muito curto' }),
});

export type UserSignUpFormValues = z.infer<typeof formSchema>;

type UserSignUpFormProps = {
  className?: ClassValue;
};

export function UserSignUpForm({ className }: UserSignUpFormProps) {
  const form = useForm<UserSignUpFormValues>({
    resolver: zodResolver(formSchema),
  });

  useVibrateOnFormError(form.formState.errors);

  const { toast } = useToast();

  const { redirectAfterAuth } = useRedirectAfterAuth();

  const onSubmit = useCallback(
    async (values: UserSignUpFormValues) => {
      try {
        const userSignUpResult = await userSignUp(values);

        toast({ description: userSignUpResult.message });

        redirectAfterAuth();
      } catch (error) {
        const errorMessage =
          error instanceof Error ? error.message : 'Erro ao fazer cadastro';

        toast({
          variant: 'destructive',
          description: errorMessage,
        });
      }
    },
    [redirectAfterAuth, toast]
  );

  return (
    <Form {...form}>
      <form
        data-testid="user-sign-up-form"
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('w-full flex flex-col gap-2', className)}
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input placeholder="João" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="exemplo@exemplo.com" {...field} />
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
              <FormLabel>Senha</FormLabel>
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

        <Button type="submit" className="w-full mt-4">
          Entrar
        </Button>

        <PasswordRecoveryLink className="mt-2" />

        <Separator className="my-2" />

        <p>
          Já tem uma conta?{' '}
          <Link className="underline" href="/login">
            Entrar
          </Link>
        </p>
      </form>
    </Form>
  );
}