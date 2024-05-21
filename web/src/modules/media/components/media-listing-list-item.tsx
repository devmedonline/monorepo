import { Button } from "@/shared/components/ui/button";
import { cn } from "@/shared/lib/utils";
import { EyeIcon, PlusIcon, Trash2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Media } from "../types/media";
import { MediaDeleteTrigger } from "./media-delete-trigger";

type MediaListingListItemProps = {
  media: Media;
  onPick?: (media: Media) => void;
};

export function MediaListingListItem({
  media,
  onPick,
}: MediaListingListItemProps) {
  const showPick = Boolean(onPick);
  return (
    <li className="relative w-full h-fit rounded-lg overflow-hidden">
      <button className="aspect-square w-full bg-secondary flex-shrink-0 cursor-pointer overflow-hidden group">
        <Image
          width={140}
          height={140}
          src={media.url}
          alt={media.description}
        />

        <div className="group absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-wrap h-full">
          {showPick && (
            <Button
              size="icon"
              className="h-1/2 w-full rounded-none col-span-2"
              title="Selecionar"
              aria-label="Selecionar"
              onClick={() => onPick?.(media)}
            >
              <PlusIcon size={16} />
            </Button>
          )}

          <Link
            className={cn(
              "w-1/2 h-full flex items-center justify-center text-white",
              showPick && "h-1/2"
            )}
            title="Ver detalhes"
            aria-label="Ver detalhes"
            href={media.url}
            rel="noreferrer"
            target="_blank"
          >
            <EyeIcon size={16} />
          </Link>

          <MediaDeleteTrigger media={media}>
            <Button
              variant="destructive"
              size="icon"
              className={cn("w-1/2 h-full rounded-none", showPick && "h-1/2")}
              title="Excluir mídia"
              aria-label="Excluir mídia"
            >
              <Trash2Icon size={16} />
            </Button>
          </MediaDeleteTrigger>
        </div>
      </button>
    </li>
  );
}
