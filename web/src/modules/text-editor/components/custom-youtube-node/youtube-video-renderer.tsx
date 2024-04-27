import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shared/components/ui/alert";
import { cn } from "@/shared/lib/utils";
import { NodeViewProps } from "@tiptap/core";
import { NodeViewWrapper } from "@tiptap/react";
import { SkullIcon } from "lucide-react";
import { useMemo } from "react";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { getEmbedIDFromYoutubeUrl } from "./utils";
import { SetYoutubeVideoOptions } from "./youtube-plugin";

type YoutubeVideoRendererProps = NodeViewProps & SetYoutubeVideoOptions;

export function YoutubeVideoRenderer(props: YoutubeVideoRendererProps) {
  const youtubeId = useMemo(() => {
    return getEmbedIDFromYoutubeUrl(props.node.attrs.src);
  }, [props.node.attrs.src]);

  return (
    <NodeViewWrapper
      className={cn("counterNode", "flex w-full items-center justify-center")}
    >
      <div
        data-drag-handle
        className="relative border rounded overflow-hidden w-full aspect-video"
      >
        {youtubeId ? (
          <LiteYouTubeEmbed id={youtubeId} title="Vídeo do YouTube" />
        ) : (
          <Alert className="rounded my-2">
            <SkullIcon className="h-4 w-4" />
            <AlertTitle>Me parece que esse vídeo não é válido</AlertTitle>
            <AlertDescription>
              Cheque se você colou a URL correta
            </AlertDescription>
          </Alert>
        )}
      </div>
    </NodeViewWrapper>
  );
}
