import syringe from "@/modules/auth/assets/syringe.jpg";
import { SignInForm } from "@/modules/auth/components/sign-in-form";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import Link from "next/link";

type SignInPageProps = {
  searchParams: {
    callbackUrl: string;
  };
};

export default function SignInPage(props: SignInPageProps) {
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
        <h1 className="text-xl ml-4 font-bold text-white">Entrar no sistema</h1>

        <SignInForm
          callbackUrl={props.searchParams.callbackUrl}
          className="flex items-end justify-center flex-col border p-4 rounded-3xl bg-card text-card-foreground"
        />

        <div className="mt-3 w-fit text-white rounded-full mr-4 ml-auto">
          <p className="text-xs">
            Não tem uma conta?{" "}
            <Link
              className="ml-2 px-3 py-1 rounded-full bg-primary/15 text-primary-foreground"
              href="/register"
              title="Cadastrar-se"
            >
              Cadastrar-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
