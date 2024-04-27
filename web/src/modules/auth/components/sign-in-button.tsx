"use client";

import { Button } from "@/shared/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import {
  LucideUserRound,
  LucideUserRoundCheck,
  LucideUserRoundPlus,
  LucideUserRoundX,
} from "lucide-react";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { memo } from "react";

function InnerSignInButton() {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Abrir menu de usuário"
          title="Abrir menu de usuário"
        >
          {session.status === "authenticated" ? (
            <div className="h-10 w-10 flex-shrink-0 aspect-square rounded-full bg-secondary flex items-center justify-center">
              {session.data.user.name[0]}
            </div>
          ) : (
            <LucideUserRound size={24} />
          )}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="max-w-48">
        {session.status === "loading" && (
          <DropdownMenuItem disabled>Carregando...</DropdownMenuItem>
        )}

        {session.status === "authenticated" && (
          <>
            <DropdownMenuLabel className="truncate">
              Olá, {session.data.user.name}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />

            {session.data.user.verified ? (
              <DropdownMenuItem asChild>
                <Link href="/adm">Administração</Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem disabled>
                Verifique seu e-mail para acessar a administração
              </DropdownMenuItem>
            )}

            <DropdownMenuItem
              onClick={() => signOut()}
              className="bg-destructive text-destructive-foreground mt-4 items-center justify-between"
            >
              Sair da conta <LucideUserRoundX size={18} />
            </DropdownMenuItem>
          </>
        )}

        {session.status === "unauthenticated" && (
          <>
            <DropdownMenuItem
              className="flex items-center justify-between"
              onClick={() => signIn()}
            >
              <span>Entrar</span>
              <LucideUserRoundCheck size={18} />
            </DropdownMenuItem>

            <DropdownMenuItem
              className="flex items-center justify-between"
              asChild
            >
              <Link href="/register">
                <span>Cadastrar</span>
                <LucideUserRoundPlus size={18} />
              </Link>
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export const SignInButton = memo(InnerSignInButton);
SignInButton.displayName = "SignInButton";
