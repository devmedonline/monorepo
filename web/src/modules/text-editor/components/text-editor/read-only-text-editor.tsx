"use client";

import { cn } from "@/shared/lib/utils";
import { EditorContent, type Content } from "@tiptap/react";
import { ClassValue } from "clsx";
import { useTextEditor } from "./use-text-editor";

type ReadOnlyTextEditorProps = {
  content?: Content;
  className?: ClassValue;
};

export function ReadOnlyTextEditor({
  content,
  className,
}: ReadOnlyTextEditorProps) {
  const editor = useTextEditor({ content, editable: false });

  return (
    <EditorContent
      editor={editor}
      className={cn(
        "dark:text-white prose-sm max-w-full prose-img:rounded prose-p:m-1 prose-p:mb-3 prose-h3:text-xl prose-p:text-balance prose-ul:m-1 prose-ul:list-disc prose-li:m-0 prose-img:border prose-img:mx-auto prose-img:w-full lg:prose-img:w-fit",
        className
      )}
    />
  );
}
