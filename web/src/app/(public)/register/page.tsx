import syringe from "@/modules/auth/assets/syringe.jpg";
import { RegisterForm } from "@/modules/auth/components/register-form";
import { fetchSignUp } from "@/modules/auth/services/fetch-sign-up";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

const signUpMutation = async (formData: FormData) => {
  "use server";

  try {
    await fetchSignUp(formData);
    return redirect("/sign-in");
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Aconteceu um erro";

    return redirect(`/register?error=${message}`);
  }
};

export default function RegisterPage() {
  return (
    <div className="h-dvh w-dvw grid place-items-center">
      <Image
        aria-hidden
        className={cn("absolute inset-0 object-cover w-full h-full")}
        alt="Siringa com vacina"
        src={syringe}
      />

      <div className="absolute backdrop-blur-md w-full h-full"></div>

      <div className="container z-10 max-w-md">
        <h1 className="text-xl ml-4 font-bold text-primary-foreground">
          Cadastrar-se no sistema
        </h1>

        <Suspense fallback={<p className="text-white">Carregando...</p>}>
          <RegisterForm
            onSubmit={signUpMutation}
            className="flex items-end justify-center flex-col border p-4 rounded-3xl bg-card text-card-foreground"
          />
        </Suspense>

        <div className="mt-3 w-fit text-white rounded-full mr-4 ml-auto">
          <p className="text-xs">
            Já tem uma conta?{" "}
            <Link
              className="ml-2 px-3 py-1 rounded-full bg-primary/15 text-primary-foreground"
              href="/sign-in"
              title="Entrar"
            >
              Entrar
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
