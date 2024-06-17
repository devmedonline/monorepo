"use client";

import { cn } from "@/shared/lib/utils";
import { EditorContent, type Content } from "@tiptap/react";
import { ClassValue } from "clsx";
import { TextEditorHelpDialogTrigger } from "../text-editor-help-dialog-trigger";
import { TextEditorMenu } from "../text-editor-menu";
import { useTextEditor } from "./use-text-editor";

type TextEditorProps = {
  content?: Content;
  onChange?: (content: Content) => void;
  className?: ClassValue;
};

export function TextEditor({ content, onChange, className }: TextEditorProps) {
  const editor = useTextEditor({ content, onChange, editable: true });

  return (
    <div>
      <TextEditorMenu editor={editor} />

      <EditorContent
        editor={editor}
        className={cn(
          "dark:prose-invert prose max-w-full prose-img:rounded mt-2 rounded border focus-within:ring-2 focus-within:ring-ring focus-within:ring-opacity-50",
          className
        )}
      />

      <TextEditorHelpDialogTrigger />
    </div>
  );
}
