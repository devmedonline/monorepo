import { Node, mergeAttributes, nodePasteRule } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { ImageRenderer } from "./image-renderer";

export type ImageNodeAttributes = {
  id?: number;
  src?: string;
  alt_text?: string;
  title?: string;
  inline: false;
  allowBase64: false;
  HTMLAttributes: {};
};

const IMAGE_URL_REGEX =
  /((?:https\:\/\/)|(?:http\:\/\/)|(?:www\.))?([a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(?:\??)[a-zA-Z0-9\-\._\?\,\'\/\\\+&%\$#\=~]+)/gi;

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customImage: {
      setCustomImage: (options: ImageNodeAttributes) => ReturnType;
    };
  }
}

export const Image = Node.create<ImageNodeAttributes>({
  name: "custom-image",

  addOptions() {
    return {
      inline: false,
      allowBase64: false,
      HTMLAttributes: {},
    };
  },

  inline() {
    return this.options.inline;
  },

  group() {
    return this.options.inline ? "inline" : "block";
  },

  draggable: true,

  addAttributes() {
    return {
      id: {
        default: null,
      },
      src: {
        default: null,
      },
      alt_text: {
        default: "Essa imagem não tem texto alternativo.",
      },
      title: {
        default: "Essa imagem não tem titulo.",
      },
    };
  },

  addPasteRules() {
    return [
      nodePasteRule({
        find: IMAGE_URL_REGEX,
        type: this.type,
        getAttributes: (match) => {
          return {
            src: match.input,
            alt_text: match.input,
            width: 640,
            height: 480,
          };
        },
      }),
    ];
  },

  parseHTML() {
    return [
      {
        tag: this.options.allowBase64
          ? "img[src]"
          : 'img[src]:not([src^="data:"])',
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "img",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageRenderer);
  },

  addCommands() {
    return {
      setCustomImage:
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
