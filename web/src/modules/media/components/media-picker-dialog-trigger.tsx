import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import Image from "next/image";
import { useState } from "react";
import { Media } from "../types/media";
import { MediaListing } from "./media-listing";

type MediaPickerDialogTriggerProps = {
  media?: Pick<Media, "url">;
  onPick: (media: Media) => void;
  children: React.ReactNode;
};

export function MediaPickerDialogTrigger({
  media,
  children,
  onPick,
}: MediaPickerDialogTriggerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<Media | null>(() => {
    const defaultMedia: Media | null = media
      ? {
          id: media.url.split("/").pop() as string,
          url: media.url,
          description: "",
          createdAt: "",
          type: "",
          updatedAt: "",
        }
      : null;

    return defaultMedia;
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {selectedMedia ? (
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
