import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Media } from "../types/media";
import { MediaListing } from "./media-listing";

type MediaPickerDialogTriggerProps = {
  media?: Pick<Media, "url">;
  onPick: (media: Media) => void;
  children: React.ReactNode;
  renderSelectedMedia?: (media: Media) => React.ReactNode;
};

export function MediaPickerDialogTrigger({
  media,
  children,
  onPick,
  renderSelectedMedia,
}: MediaPickerDialogTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Format default media object to be used when media prop is not provided
  const formatDefaultMedia = useCallback((media: Partial<Media>) => {
    const url = media?.url || "";

    return {
      id: media.id ?? url.split("/").pop() ?? "unknown",
      url: url,
      description: media.description || "sem descrição",
      createdAt: media.createdAt || Date.now().toString(),
      type: media.type || "image",
      updatedAt: media.updatedAt || Date.now().toString(),
    };
  }, []);

  // Selected media state
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(() => {
    return media?.url ? formatDefaultMedia(media) : null;
  });

  // Update selected media when media prop changes
  useEffect(() => {
    setSelectedMedia((prev) => {
      if (media?.url && media.url !== prev?.url) {
        return formatDefaultMedia(media);
      }

      return prev;
    });
  }, [media, formatDefaultMedia]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {selectedMedia ? (
          renderSelectedMedia ? (
            renderSelectedMedia(selectedMedia)
          ) : (
            <button className="flex items-center space-x-2">
              <Image
                src={selectedMedia.url}
                alt={selectedMedia.description}
                width={120}
                height={120}
                className="rounded-lg aspect-square object-cover"
              />

              <span
                className="text-sm text-muted-foreground"
                title={selectedMedia.description}
              >
                {selectedMedia.description || "Sem descrição de mídia"}
              </span>
            </button>
          )
        ) : (
          children
        )}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Selecione uma mídia</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 justify-between">
          <MediaListing
            className="p-0"
            onPick={(media) => {
              setSelectedMedia(media);
              setIsOpen(false);
              onPick(media);
            }}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
