"use client";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
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
import { cn } from "@/shared/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { LucideSyringe, LucideTriangleAlert } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signInFormSchema } from "./sign-in-form";

export const registerFormSchema = signInFormSchema.extend({
  name: z
    .string({
      message: "Nome inválido",
      required_error: "Nome é obrigatório",
    })
    .min(3, { message: "Nome deve ter no mínimo 3 caracteres" }),
});

type RegisterFormSchema = z.infer<typeof registerFormSchema>;

type RegisterFormProps = {
  className?: string;
  onSubmit: (values: FormData) => unknown;
};

export function RegisterForm({
  className,
  onSubmit: action,
}: RegisterFormProps) {
  const form = useForm<RegisterFormSchema>({
    resolver: zodResolver(registerFormSchema),
  });

  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("error");

  return (
    <Form {...form}>
      <form
        action={action}
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit(async (values) => {
            const formData = new FormData();
            formData.append("name", values.name);
            formData.append("email", values.email);
            formData.append("password", values.password);
            await action(formData);
          })(e);
        }}
        className={cn("space-y-4", className)}
      >
        {errorMessage && (
          <Alert variant="destructive">
            <AlertTitle className="flex items-center gap-1">
              <LucideTriangleAlert size={18} /> Algo deu errado!
            </AlertTitle>
            <AlertDescription>{errorMessage}</AlertDescription>
          </Alert>
        )}

        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="w-full">
              <FormLabel>Nome</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
              <FormDescription>
                Utilize seu nome completo para criar sua conta
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

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
            <Link href="/">Cancelar</Link>
          </Button>
          <Button type="submit" className="gap-2 hover:animate-tickle">
            Entrar <LucideSyringe size={18} className="rotate-180" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
