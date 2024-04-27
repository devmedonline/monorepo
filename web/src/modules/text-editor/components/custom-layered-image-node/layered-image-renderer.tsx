import { cn } from "@/shared/lib/utils";
import { NodeViewProps } from "@tiptap/core";
import { NodeViewWrapper } from "@tiptap/react";
import { GripVerticalIcon } from "lucide-react";
import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";

type LayeredImageRendererProps = NodeViewProps;

export function LayeredImageRenderer(props: LayeredImageRendererProps) {
  const canModify = props.editor.isEditable;

  return (
    <NodeViewWrapper
      as="figure"
      className={cn("counterNode", "flex w-full items-center justify-center")}
    >
      <div className="relative border rounded overflow-hidden w-fit">
        {canModify && (
          <button
            data-drag-handle
            title="Clique e arraste para mover a imagem"
            aria-label="Clique e arraste para mover a imagem"
            className="absolute top-2 right-2 p-1 bg-secondary text-secondary-foreground rounded shadow active:bg-opacity-50 hover:bg-opacity-50"
          >
            <GripVerticalIcon className="h-4 w-4" />
          </button>
        )}

        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={props.node.attrs.src}
          alt={props.node.attrs.alt_text}
          width={props.node.attrs.width}
          height={props.node.attrs.height}
        />
      </div>
    </NodeViewWrapper>
  );
}
