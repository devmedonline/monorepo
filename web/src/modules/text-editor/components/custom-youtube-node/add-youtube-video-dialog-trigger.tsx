import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { Button } from "@/shared/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/components/ui/dialog";
import { Input } from "@/shared/components/ui/input";
import { Label } from "@/shared/components/ui/label";
import { SkullIcon, VideoIcon } from "lucide-react";
import { useId, useMemo, useState } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { getEmbedIDFromYoutubeUrl } from "./utils";

type AddYoutubeVideoDialogTriggerProps = {
  children: React.ReactNode;
  onSave: (src: string) => void;
};

export function AddYoutubeVideoDialogTrigger({
  children,
  onSave,
}: AddYoutubeVideoDialogTriggerProps) {
  const [open, setOpen] = useState(false);
  const [url, setUrl] = useState("");
  const id = useId();

  const youtubeId = useMemo(() => {
    return getEmbedIDFromYoutubeUrl(url);
  }, [url]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar vídeo do youtube</DialogTitle>

          <DialogDescription>Cole o link do vídeo do youtube</DialogDescription>
        </DialogHeader>

        {youtubeId ? (
          <div className="rounded overflow-hidden">
            <LiteYouTubeEmbed id={youtubeId} title="Vídeo do YouTube" />
          </div>
        ) : (
          <Alert className="rounded my-2">
            <SkullIcon className="h-4 w-4" />
            <AlertTitle>Me parece que esse vídeo não é válido</AlertTitle>
            <AlertDescription>
              Cheque se você colou a URL correta
            </AlertDescription>
          </Alert>
        )}

        <div>
          <Label htmlFor={id}>URL</Label>
          <Input
            id={id}
            type="text"
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            className="block w-full mt-1"
          />
        </div>

        <DialogFooter>
          <Button onClick={() => setOpen(false)}>Cancelar</Button>
          <Button
            disabled={!youtubeId}
            onClick={() => {
              onSave(url);
              setOpen(false);
            }}
          >
            Adicionar <VideoIcon className="h-4 w-4 ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
