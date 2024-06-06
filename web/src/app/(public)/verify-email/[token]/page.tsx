import { fetchEmailVerification } from "@/modules/auth/services/fetch-email-verification";
import { Button } from "@/shared/components/ui/button";
import { LucideAmbulance, LucideMailCheck } from "lucide-react";
import Link from "next/link";

type VerifyEmailPageProps = {
  params: {
    token: string;
  };
  searchParams: {};
};

export default async function VerifyEmailPage({
  params,
}: VerifyEmailPageProps) {
  const response = await fetchEmailVerification(params.token).catch((error) => {
    console.error(error);
    return null;
  });

  return (
    <main className="grid place-items-center h-screen w-screen bg-primary container">
      <div className="flex flex-col items-center gap-4 p-8 bg-background text-foreground rounded-lg shadow-lg border">
        <h1 className="text-3xl font-semibold flex items-center">
          <LucideMailCheck size={28} className="mr-4 flex-shrink-0" />
          Verificação de Email
        </h1>

        {response ? (
          <p className="text-lg text-emerald-500">
            Email verificado com sucesso!
          </p>
        ) : (
          <p className="text-lg text-destructive">
            Ocorreu um erro ao verificar o email.
          </p>
        )}

        <Button asChild>
          <Link href="/">
            Voltar para a página inicial
            <LucideAmbulance size={24} className="ml-2" />
          </Link>
        </Button>
      </div>
    </main>
  );
}
