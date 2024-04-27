import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { LayeredImageRenderer } from "./layered-image-renderer";

export type LayeredImageNodeAttributes = {
  layers: Array<{ src: string; title: string }>;
  HTMLAttributes?: {};
};

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customLayeredImage: {
      setCustomLayeredImage: (
        options: LayeredImageNodeAttributes
      ) => ReturnType;
    };
  }
}

export const LayeredImage = Node.create<LayeredImageNodeAttributes>({
  name: "custom-layered-image",

  addOptions() {
    return {
      layers: [],
    };
  },

  draggable: true,

  addAttributes() {
    return {
      layers: {
        default: [],
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "figure",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "figure",
      mergeAttributes(this.options.HTMLAttributes ?? {}, HTMLAttributes),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(LayeredImageRenderer);
  },

  addCommands() {
    return {
      setCustomLayeredImage:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
