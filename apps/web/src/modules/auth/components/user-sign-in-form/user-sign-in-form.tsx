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
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useRedirectAfterAuth } from '../../hooks/use-redirect-after-auth';
import { useSignInMutation } from '../../hooks/use-sign-in-mutation';
import { signInSchema } from '../../schemas/sign-in-schema';
import { PasswordRecoveryLink } from '../password-recovery-link';

const formSchema = signInSchema;

export type UserSignInFormValues = z.infer<typeof formSchema>;

type UserSignInFormProps = {
  className?: ClassValue;
};

export function UserSignInForm({ className }: UserSignInFormProps) {
  const form = useForm<UserSignInFormValues>({
    resolver: zodResolver(formSchema),
  });

  useVibrateOnFormError(form.formState.errors);

  const { toast } = useToast();

  const { redirectAfterAuth } = useRedirectAfterAuth();

  const signInMutation = useSignInMutation();

  const onSubmit = async (values: UserSignInFormValues) => {
    toast({ description: 'Fazendo login...' });
    try {
      const userSignInResult = await signInMutation.mutateAsync(values);

      toast({ description: userSignInResult.message });

      redirectAfterAuth();
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Ocorreu um erro ao fazer login';

      toast({
        variant: 'destructive',
        description: errorMessage,
      });
    }
  };

  return (
    <Form {...form}>
      <form
        data-testid="user-sign-in-form"
        method="POST"
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn('w-full flex flex-col gap-2', className)}
      >
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
          Ainda não tem uma conta?{' '}
          <Link className="underline" href="/register">
            Cadastre-se
          </Link>
        </p>
      </form>
    </Form>
  );
}
