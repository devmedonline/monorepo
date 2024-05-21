import Image from "next/image";
import { GeneralCategory } from "../types/general-category";

import { Button } from "@/shared/components/ui/button";
import {
  ArrowDownRight,
  EyeIcon,
  EyeOffIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import { GeneralCategoryDeleteTrigger } from "./general-category-delete-trigger";
import { UpdateGeneralCategoryDialogTrigger } from "./update-general-category-form";
import { UpdateGeneralCategoryVisibilityToggle } from "./update-general-category-visibility-toggle";

type GeneralCategoryImageDropdownTriggerProps = {
  generalCategory: GeneralCategory;
};

export function GeneralCategoryImageDropdownTrigger({
  generalCategory,
}: GeneralCategoryImageDropdownTriggerProps) {
  const visibilityLabel = generalCategory.publicAvailable
    ? "Ocultar categoria"
    : "Exibir categoria";
  return (
    <button className="rounded-xl rounded-tl bg-secondary flex-shrink-0 cursor-pointer overflow-hidden relative group">
      <Image
        width={64}
        height={64}
        src={generalCategory.thumbnail}
        alt={generalCategory.name}
        className="aspect-square object-cover"
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity grid grid-cols-2 grid-rows-2">
        <span
          className="w-full h-full flex items-center justify-center text-white"
          title="Ver detalhes"
          aria-label="Ver detalhes"
        >
          <ArrowDownRight size={16} />
        </span>

        <UpdateGeneralCategoryVisibilityToggle
          id={generalCategory.id}
          publicAvailable={generalCategory.publicAvailable}
          title={visibilityLabel}
          aria-label={visibilityLabel}
          variant={generalCategory.publicAvailable ? "destructive" : "default"}
          size="icon"
          className="w-full h-full rounded-none"
        >
          {generalCategory.publicAvailable ? (
            <EyeIcon size={16} />
          ) : (
            <EyeOffIcon size={16} />
          )}
        </UpdateGeneralCategoryVisibilityToggle>

        <UpdateGeneralCategoryDialogTrigger defaultValues={generalCategory}>
          <Button
            variant="secondary"
            size="icon"
            className="w-full h-full rounded-none"
            title="Editar categoria"
            aria-label="Editar categoria"
          >
            <PencilIcon size={16} />
          </Button>
        </UpdateGeneralCategoryDialogTrigger>

        <GeneralCategoryDeleteTrigger generalCategory={generalCategory}>
          <Button
            variant="destructive"
            size="icon"
            className="w-full h-full rounded-none"
            title="Excluir categoria"
            aria-label="Excluir categoria"
          >
            <Trash2Icon size={16} />
          </Button>
        </GeneralCategoryDeleteTrigger>
      </div>
    </button>
  );
}
