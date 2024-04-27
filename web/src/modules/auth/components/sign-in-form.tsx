"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { useToast } from "@/shared/components/ui/use-toast";
import { cn } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideSyringe } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const signInFormSchema = z.object({
  email: z
    .string({
      message: "Email inválido",
      required_error: "Email é obrigatório",
    })
    .email({ message: "Email inválido" }),
  password: z
    .string({
      message: "Senha inválida",
      required_error: "Senha é obrigatória",
    })
    .min(8, { message: "Senha deve ter no mínimo 8 caracteres" })
    .regex(/[a-z]/, {
      message: "Senha deve conter pelo menos uma letra minúscula",
    })
    .regex(/[A-Z]/, {
      message: "Senha deve conter pelo menos uma letra maiúscula",
    })
    .regex(/[0-9]/, { message: "Senha deve conter pelo menos um número" })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Senha deve conter pelo menos um carácter especial",
    }),
});

type SignInFormSchema = z.infer<typeof signInFormSchema>;

type SignInFormProps = {
  className?: string;
  callbackUrl?: string;
};

export function SignInForm({ className, callbackUrl }: SignInFormProps) {
  const form = useForm<SignInFormSchema>({
    resolver: zodResolver(signInFormSchema),
  });

  const { toast } = useToast();

  const router = useRouter();

  async function onSubmit(values: SignInFormSchema) {
    try {
      const data = await signIn("credentials", {
        email: values.email,
        password: values.password,
        callbackUrl,
        redirect: false,
      });

      if (data?.ok) {
        return router.replace(callbackUrl ?? "/");
      }

      const mapError: Record<string, string> = {
        CredentialsSignin: "Credenciais inválidas",
      };

      const message = data?.error ? mapError[data.error] : "Erro desconhecido";

      toast({
        title: "Erro ao entrar",
        description: message,
        variant: "destructive",
      });

      form.setError("email", {
        type: "manual",
        message: "Credenciais inválidas",
      });

      form.setError("password", {
        type: "manual",
        message: "Credenciais inválidas",
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Erro desconhecido";

      toast({
        title: "Erro ao entrar",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-4", className)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input type="email" {...field} />
              </FormControl>
              <FormDescription>
                Utilize um e-mail válido para acessar sua conta
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" {...field} />
              </FormControl>
              <FormDescription>
                Sua senha deve conter pelo menos 8 caracteres, uma letra
                maiúscula, uma minúscula, um número e um carácter especial
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex space-x-2">
          <Button variant="link" asChild>
            <Link href={callbackUrl ?? "/"}>Cancelar</Link>
          </Button>
          <Button type="submit" className="gap-2 hover:animate-tickle">
            Entrar <LucideSyringe size={18} className="rotate-180" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
