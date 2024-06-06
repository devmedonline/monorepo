"use client";

import { Button } from "@/shared/components/ui/button";
import { CardContent, CardFooter } from "@/shared/components/ui/card";
import { Input } from "@/shared/components/ui/input";
import { Skeleton } from "@/shared/components/ui/skeleton";
import { useToast } from "@/shared/components/ui/use-toast";
import { useDebouncedValue } from "@/shared/hooks/use-debounced-value";
import { cn } from "@/shared/lib/utils";
import { ArrowLeftIcon, ArrowRightIcon, PlusIcon } from "lucide-react";
import { useCallback, useState } from "react";
import { useMediaListingQuery } from "../hooks/use-media-listing-search-query";
import { uploadImageToGallery } from "../services/upload-image-to-gallery";
import { Media } from "../types/media";
import { ImageUploadDialogTrigger } from "./image-upload-dialog-trigger";
import { MediaListingListItem } from "./media-listing-list-item";

type MediaListingProps = {
  onPick?: (media: Media) => void;
  className?: string;
};

export function MediaListing({ onPick, className }: MediaListingProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const nextPage = useCallback(() => {
    setCurrentPage((state) => state + 1);
  }, []);

  const previousPage = useCallback(() => {
    setCurrentPage((state) => state - 1);
  }, []);

  const mediaQuery = useMediaListingQuery({
    search: debouncedSearch,
    page: currentPage,
    take: 6,
  });

  const onSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setCurrentPage(1);
    setSearch(e.currentTarget.search.value);
  }, []);

  const { toast } = useToast();

  const hasNoImages =
    mediaQuery.isSuccess && mediaQuery.data.media.length === 0;

  return (
    <>
      <CardContent className={cn("h-full w-full", className)}>
        <search className="mb-4">
          <form
            action="/api/backend/file-upload"
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

        {mediaQuery.isLoading && (
          <div className="space-y-2">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        )}

        {mediaQuery.isError && (
          <div>
            Ocorreu um erro ao carregar as mídias: {mediaQuery.error.message}
          </div>
        )}

        {hasNoImages && (
          <p className="text-center text-muted-foreground pb-4 pt-8">
            Nenhuma mídia encontrada. Adicione uma nova mídia clicando no botão
            com sinal de adição.
          </p>
        )}

        {mediaQuery.isSuccess && (
          <ul className="gap-2 grid grid-cols-3 w-full">
            {mediaQuery.data.media.map((media) => (
              <MediaListingListItem
                key={media.id}
                media={media}
                onPick={onPick}
              />
            ))}
          </ul>
        )}
      </CardContent>

      <CardFooter className="justify-end items-center flex space-x-2">
        <ImageUploadDialogTrigger
          onFailedUpload={(error) => {
            toast({
              title: "Erro ao fazer upload",
              description: error.message,
              variant: "destructive",
            });
          }}
          onSuccessfulUpload={() => {
            toast({
              title: "Upload realizado com sucesso",
              description: "A imagem foi enviada com sucesso",
              variant: "success",
            });
          }}
          uploadImage={(file) => {
            return uploadImageToGallery(file);
          }}
        >
          <Button
            title="Adicionar mídia"
            aria-label="Adicionar mídia"
            size="icon"
            variant="outline"
            className="relative"
          >
            {hasNoImages && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            )}
            <PlusIcon />
          </Button>
        </ImageUploadDialogTrigger>
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
    </>
  );
}
