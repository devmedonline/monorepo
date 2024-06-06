import { Button } from "@/shared/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/shared/components/ui/command";
import { FormControl } from "@/shared/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { useDebouncedValue } from "@/shared/hooks/use-debounced-value";
import { cn } from "@/shared/lib/utils";
import { CheckCheck, ChevronsUpDown } from "lucide-react";
import Image from "next/image";
import { forwardRef, useState } from "react";
import { useGeneralCategoryQuery } from "../hooks/use-general-category-search-query";
import { GeneralCategory } from "../types/general-category";

export const GeneralCategorySelector = forwardRef<
  HTMLInputElement,
  { value: string; onChange: (value: GeneralCategory) => void }
>(({ value, onChange }, ref) => {
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebouncedValue(search, 500);

  const generalCategoriesQuery = useGeneralCategoryQuery({
    search: debouncedSearch,
    page: 1,
    take: 15,
  });

  const categoryList = generalCategoriesQuery.data
    ? generalCategoriesQuery.data.generalCategories
    : [];

  const categoryName = categoryList.find((it) => it.id === value)?.name;

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant="outline"
            role="combobox"
            className={cn("justify-between", !value && "text-muted-foreground")}
          >
            {categoryName || "Selecione uma categoria"}
            <ChevronsUpDown className="ml-1 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>

      <PopoverContent
        align="start"
        className="w-full max-w-full min-w-full p-0"
      >
        <Command>
          <CommandList>
            <CommandInput
              placeholder="Buscar categoria"
              value={search || ""}
              onValueChange={(value) => {
                setSearch(value);
              }}
            />

            <CommandEmpty>
              {generalCategoriesQuery.isLoading
                ? "Carregando..."
                : "Nenhuma categoria encontrada"}
            </CommandEmpty>

            {categoryList.length > 0 && (
              <CommandGroup>
                {categoryList.map((it) => (
                  <CommandItem
                    value={it.id}
                    key={it.id}
                    onSelect={() => {
                      onChange(it);
                    }}
                  >
                    <CheckCheck
                      className={cn(
                        "mr-2 h-4 w-4",
                        it.id === value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {it.name}

                    <Image
                      src={it.thumbnail}
                      alt={it.name}
                      className="w-8 h-8 rounded-full ml-auto"
                      width={32}
                      height={32}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
});
GeneralCategorySelector.displayName = "GeneralCategorySelector";
