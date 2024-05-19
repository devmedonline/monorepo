"use client";

import { ThemeOptions } from "@/modules/layout/components/theme-options";
import { CardContentError } from "@/shared/components/card-content-error";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/shared/components/ui/card";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { cn } from "@/shared/lib/utils";
import Image from "next/image";
import { useCurrentUserQuery } from "../hooks/use-current-user-query";

export function CurrentUserProfileCard() {
  const currentUserDataQuery = useCurrentUserQuery();

  if (currentUserDataQuery.isLoading) {
    return (
      <Card>
        <CardHeader className="flex space-x-4 flex-row items-center">
          <Skeleton className="rounded-3xl rounded-tl h-12 w-12" />
          <Skeleton className="h-12 w-2/3" />
        </CardHeader>

        <CardContent>
          <div className="w-full">
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-4 w-32 mt-2" />
          </div>
        </CardContent>

        <CardFooter>
          <Skeleton className="h-4 w-24" />
        </CardFooter>
      </Card>
    );
  }

  if (currentUserDataQuery.isError) {
    return (
      <Card>
        <CardContentError message="Erro ao carregar os dados do usuário." />
      </Card>
    );
  }

  if (!currentUserDataQuery.data) {
    return (
      <Card>
        <CardContent className="flex items-center space-x-4 py-4 justify-center h-full">
          <span className="text-destructive">
            Não foi possível carregar os dados do usuário.
          </span>
        </CardContent>
      </Card>
    );
  }

  const userData = currentUserDataQuery.data;

  return (
    <Card>
      <CardHeader className="flex space-x-4 flex-row items-center">
        <Image
          src={userData.avatar}
          alt="Avatar"
          width={48}
          height={48}
          className="rounded-3xl rounded-tl"
        />
        <span className="text-xl font-semibold truncate">{userData.name}</span>
      </CardHeader>

      <CardContent>
        <div className="w-full">
          <p className="text-muted-foreground truncate">{userData.email}</p>
          <p
            className="text-xs text-muted-foreground truncate"
            aria-label={`ID de usuário: ${prettifyUUID(userData.id)}`}
          >
            #{prettifyUUID(userData.id)}
          </p>
        </div>

        <ThemeOptions className="mt-4" />
      </CardContent>

      <CardFooter>
        <strong
          className={cn(
            "text-sm font-semibold",
            userData.verified ? "text-green-500" : "text-red-500"
          )}
        >
          {userData.verified ? "Verificado" : "Não verificado"}
        </strong>
      </CardFooter>
    </Card>
  );
}

const prettifyUUID = (uuid: string) => {
  return uuid.replace(/-/g, "").slice(0, 8).toUpperCase();
};
