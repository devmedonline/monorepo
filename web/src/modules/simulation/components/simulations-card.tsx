"use client";

import { Button } from "@/shared/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useDebouncedValue } from "@/shared/hooks/use-debounced-value";
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useSimulationQuery } from "../hooks/use-simulation-search-query";
import { CreateNewSimulationDialogTrigger } from "./create-new-simulation-form";
import { SimulationListItem } from "./simulation-list-item";

export function SimulationsCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const nextPage = useCallback(() => {
    setCurrentPage((state) => state + 1);
  }, []);

  const previousPage = useCallback(() => {
    setCurrentPage((state) => state - 1);
  }, []);

  const simulationQuery = useSimulationQuery({
    search: debouncedSearch,
    page: currentPage,
    take: 3,
  });

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearch(e.currentTarget.search.value);
  }, []);

  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle>Simulações</CardTitle>
        <CardDescription>Gerencie as simulações do sistema</CardDescription>
      </CardHeader>

      <CardContent className="h-full">
        <search className="mb-4">
          <form
            action="/api/backend/simulation-categories"
            method="get"
            onSubmit={onSubmit}
          >
            <Input
              type="text"
              value={search}
              name="search"
              placeholder="Pesquisar"
              aria-label="Pesquisar"
              title="Pesquisar"
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
          </form>
        </search>

        {simulationQuery.isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        )}

        {simulationQuery.isError && (
          <div>
            Ocorreu um erro ao carregar as simulações:{" "}
            {simulationQuery.error.message}
          </div>
        )}

        {simulationQuery.isSuccess && (
          <ul className="space-y-2">
            {simulationQuery.data.simulations.map((category) => (
              <SimulationListItem key={category.id} simulation={category} />
            ))}
          </ul>
        )}

        {simulationQuery.isSuccess &&
          simulationQuery.data.simulations.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              Nenhuma simulação encontrada
            </p>
          )}
      </CardContent>

      <CardFooter className="justify-end items-center flex space-x-2">
        <CreateNewSimulationDialogTrigger>
          <Button
            className="mr-auto"
            title="Criar nova simulação"
            aria-label="Criar nova simulação"
            size="sm"
            variant="outline"
          >
            Criar nova simulação
            <PlusIcon size={16} aria-hidden className="ml-2" />
          </Button>
        </CreateNewSimulationDialogTrigger>

        <Button
          onClick={previousPage}
          title="Página anterior"
          aria-label="Página anterior"
          size="icon"
          variant="outline"
        >
          <ArrowLeftIcon />
        </Button>
        <Button
          onClick={nextPage}
          title="Próxima página"
          aria-label="Próxima página"
          size="icon"
          variant="outline"
        >
          <ArrowRightIcon />
        </Button>
      </CardFooter>
    </Card>
  );
}
