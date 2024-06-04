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
import Link from "next/link";
import { useCallback, useState } from "react";
import { usePostQuery } from "../hooks/use-post-search-query";
import { PostListItem } from "./post-list-item";

export function PostCard() {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const nextPage = useCallback(() => {
    setCurrentPage((state) => state + 1);
  }, []);

  const previousPage = useCallback(() => {
    setCurrentPage((state) => state - 1);
  }, []);

  const postQuery = usePostQuery({
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
        <CardTitle>Publicações</CardTitle>
        <CardDescription>Gerencie as publicações do sistema</CardDescription>
      </CardHeader>

      <CardContent className="h-full">
        <search className="mb-4">
          <form action="/api/backend/post" method="get" onSubmit={onSubmit}>
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

        {postQuery.isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        )}

        {postQuery.isError && (
          <div>
            Ocorreu um erro ao carregar as publicações:{" "}
            {postQuery.error.message}
          </div>
        )}

        {postQuery.isSuccess && (
          <ul className="space-y-2">
            {postQuery.data.posts.map((post) => (
              <PostListItem key={post.id} post={post} />
            ))}
          </ul>
        )}
      </CardContent>

      <CardFooter className="justify-end items-center flex space-x-2">
        <Button
          className="mr-auto"
          title="Criar nova publicação"
          aria-label="Criar nova publicação"
          size="sm"
          variant="outline"
          asChild
        >
          <Link href="/post" target="__blank">
            Criar nova publicação
            <PlusIcon size={16} aria-hidden className="ml-2" />
          </Link>
        </Button>

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
