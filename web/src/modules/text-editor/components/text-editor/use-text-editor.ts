import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import { useEditor, type Content, type EditorOptions } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useId } from "react";
import { Image } from "../custom-image-node";
import { LayeredImage } from "../custom-layered-image-node";
import { Youtube } from "../custom-youtube-node";

type UseTextEditorOptions = Partial<
  Omit<EditorOptions, "extensions" | "onUpdate" | "editorProps">
> & {
  onChange?: (content: Content) => void;
};

const DEFAULT_USE_TEXT_EDITOR_OPTIONS: UseTextEditorOptions = {
  editable: true,
};

export function useTextEditor(options = DEFAULT_USE_TEXT_EDITOR_OPTIONS) {
  const id = useId();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [2, 3, 4, 5, 6],
        },
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Youtube.configure({ inline: false }),
      Image,
      LayeredImage,
    ],
    injectCSS: false,
    content: options.content,
    editable: options.editable,
    onUpdate: ({ editor }: { editor: any }) => {
      options.onChange?.(editor.getJSON());
    },
    editorProps: {
      attributes: {
        id: id,
      },
    },
  });

  return editor;
}
