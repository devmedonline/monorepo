import { SignInButtonList } from "@/modules/auth/components/sign-in-button";
import { getServerSession } from "@/modules/auth/lib/get-server-session";
import { Button } from "@/shared/components/ui/button";
import { LucideLoader2 } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export default async function ProtectedTemplate({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Suspense fallback={<Loading />}>
      <WrapOnSession>{children}</WrapOnSession>
    </Suspense>
  );
}

async function WrapOnSession({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession();

  if (session === null) {
    return <NotAuthenticated />;
  }

  if (session.user.verified === false) {
    return <NotVerified />;
  }

  return <>{children}</>;
}

function NotAuthenticated() {
  return (
    <main className="fixed inset-0 bg-primary grid place-items-center p-4">
      <div className="max-w-96 p-4 bg-primary-foreground text-primary shadow-lg rounded-3xl">
        <strong className="mb-8 text-4xl block font-bold">
          Você não está autenticado. Por favor, faça login para acessar esta
          página.
        </strong>

        <SignInButtonList />
      </div>
    </main>
  );
}

function NotVerified() {
  return (
    <main className="fixed inset-0 bg-primary grid place-items-center p-4">
      <div className="max-w-96 p-4 bg-primary-foreground text-primary shadow-lg rounded-3xl">
        <strong className="mb-8 text-4xl block font-bold">
          Seu e-mail ainda não foi verificado. Por favor, verifique seu e-mail
        </strong>

        <Button asChild>
          <Link href="/">Voltar para a página inicial</Link>
        </Button>
      </div>
    </main>
  );
}

function Loading() {
  return (
    <main className="fixed inset-0 bg-background backdrop-blur-sm text-foreground grid place-items-center">
      <div className="flex flex-col items-center gap-4">
        <LucideLoader2 className="w-16 h-16 animate-spin" />
        <p className="text-lg font-semibold text-center">
          Carregando dados de seção
          <span
            className="animate-pulse text-2xl"
            style={{ animationDelay: "0.1s" }}
          >
            .
          </span>
          <span
            className="animate-pulse text-2xl"
            style={{ animationDelay: "0.2s" }}
          >
            .
          </span>
          <span
            className="animate-pulse text-2xl"
            style={{ animationDelay: "0.3s" }}
          >
            .
          </span>
        </p>
      </div>
    </main>
  );
}
