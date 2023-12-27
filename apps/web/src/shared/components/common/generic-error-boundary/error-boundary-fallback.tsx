import { FallbackProps } from "react-error-boundary";
import { Button } from "../../ui/button";
import { ActivityIcon, HelpCircleIcon } from "lucide-react";
import Link from "next/link";

export function ErrorBoundaryFallback({ error, resetErrorBoundary }: FallbackProps) {
  return (
    <div role="alert" className="bg-primary/5 border border-primary text-primary px-4 py-3 rounded container my-5">
      <p>
        <ActivityIcon className="inline-block mr-2" />
        Algo deu errado:
      </p>

      <pre className="overflow-auto font-mono bg-primary text-primary-foreground p-2 rounded my-3">{error.message}</pre>

      <p className="text-sm text-muted-foreground my-3 flex items-center">
        <HelpCircleIcon size={16} className="mr-2" />
        Se o problema persistir, entre em contato com o &nbsp;
        <Link className="underline" href="/contato">
          suporte técnico
        </Link>
        .
      </p>

      <div className="flex gap-2 mt-6">
        <Button onClick={resetErrorBoundary}>Tente novamente</Button>
        <Button variant="secondary" onClick={() => window.location.reload()}>
          Recarregar a página
        </Button>
      </div>
    </div>
  );
}
