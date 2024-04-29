"use client";

import { Button } from "@/shared/components/ui/button";
import { useSession } from "next-auth/react";
import Link from "next/link";

export function FloatingDashboardButton() {
  const session = useSession();

  if (session.status !== "authenticated") return null;

  return (
    <Button
      size="icon"
      aria-label="Ir para o painel de controle"
      title="Ir para o painel de controle"
      className="fixed bottom-4 right-4 z-50 rounded-full rounded-br-none"
      asChild
    >
      <Link href="/adm">{session.data.user.name[0]}</Link>
    </Button>
  );
}
