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
import { useGeneralCategoryQuery } from "../hooks/use-general-category-search-query";
import { CreateNewCategoryDialogTrigger } from "./create-new-category-form";
import { GeneralCategoryListItem } from "./general-category-list-item";

export function GeneralCategoriesCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const nextPage = useCallback(() => {
    setCurrentPage((state) => state + 1);
  }, []);

  const previousPage = useCallback(() => {
    setCurrentPage((state) => state - 1);
  }, []);

  const generalCategoriesQuery = useGeneralCategoryQuery({
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
        <CardTitle>Categorias gerais</CardTitle>
        <CardDescription>
          Gerencie as categorias gerais do sistema
        </CardDescription>
      </CardHeader>

      <CardContent className="h-full">
        <search className="mb-4">
          <form
            action="/api/backend/general-categories"
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

        {generalCategoriesQuery.isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        )}

        {generalCategoriesQuery.isError && (
          <div>
            Ocorreu um erro ao carregar as categorias:{" "}
            {generalCategoriesQuery.error.message}
          </div>
        )}

        {generalCategoriesQuery.isSuccess && (
          <ul className="space-y-2">
            {generalCategoriesQuery.data.generalCategories.map((category) => (
              <GeneralCategoryListItem
                key={category.id}
                generalCategory={category}
              />
            ))}
          </ul>
        )}

        {generalCategoriesQuery.isSuccess &&
          generalCategoriesQuery.data.generalCategories.length === 0 && (
            <p className="text-center text-sm text-muted-foreground">
              Nenhuma categoria encontrada
            </p>
          )}
      </CardContent>

      <CardFooter className="justify-end items-center flex space-x-2">
        <CreateNewCategoryDialogTrigger>
          <Button
            className="mr-auto"
            title="Criar nova categoria"
            aria-label="Criar nova categoria"
            size="sm"
            variant="outline"
          >
            Criar nova categoria
            <PlusIcon size={16} aria-hidden className="ml-2" />
          </Button>
        </CreateNewCategoryDialogTrigger>

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
