"use client";

import { ImageUploadDialogTrigger } from "@/modules/media/components/image-upload-dialog-trigger";
import { LayeredImageUploadDialogTrigger } from "@/modules/media/components/layered-image-upload-dialog-trigger";
import { uploadImageToGallery } from "@/modules/media/services/upload-image-to-gallery";
import { useToast } from "@/shared/components/ui/use-toast";
import { Editor } from "@tiptap/react";
import {
  BoldIcon,
  Code2Icon,
  CodeIcon,
  Heading2Icon,
  Heading3Icon,
  Heading4Icon,
  Heading5Icon,
  Heading6Icon,
  ImageIcon,
  ImagesIcon,
  ItalicIcon,
  ListIcon,
  ListOrderedIcon,
  PilcrowIcon,
  QuoteIcon,
  RedoIcon,
  RemoveFormattingIcon,
  SplitSquareHorizontalIcon,
  StrikethroughIcon,
  UndoIcon,
  WorkflowIcon,
  WrapTextIcon,
  YoutubeIcon,
} from "lucide-react";
import { AddYoutubeVideoDialogTrigger } from "../custom-youtube-node";
import { TextEditorActionButton } from "./text-editor-action-button";

type TextEditorMenuProps = {
  editor: Editor | null;
};

export function TextEditorMenu({ editor }: TextEditorMenuProps) {
  const { toast } = useToast();

  if (!editor) return null;

  return (
    <div className="flex flex-wrap w-full rounded overflow-hidden border">
      <TextEditorActionButton
        icon={<BoldIcon size={18} />}
        label="negrito"
        onClick={() => editor.chain().focus().toggleBold().run()}
        disabled={!editor.can().chain().focus().toggleBold().run()}
        active={editor.isActive("bold")}
      />

      <TextEditorActionButton
        onClick={() => editor.chain().focus().toggleItalic().run()}
        disabled={!editor.can().chain().focus().toggleItalic().run()}
        active={editor.isActive("italic")}
        icon={<ItalicIcon size={18} />}
        label="itálico"
      />

      <TextEditorActionButton
        onClick={() => editor.chain().focus().toggleStrike().run()}
        disabled={!editor.can().chain().focus().toggleStrike().run()}
        active={editor.isActive("strike")}
        icon={<StrikethroughIcon size={18} />}
        label="riscado"
      />

      <TextEditorActionButton
        onClick={() => editor.chain().focus().toggleCode().run()}
        disabled={!editor.can().chain().focus().toggleCode().run()}
        active={editor.isActive("code")}
        icon={<CodeIcon size={18} />}
        label="código"
      />

      <TextEditorActionButton
        onClick={() => editor.chain().focus().unsetAllMarks().run()}
        icon={<RemoveFormattingIcon size={18} />}
        label="remover formatação"
      />

      <TextEditorActionButton
        onClick={() => editor.chain().focus().clearNodes().run()}
        icon={<WorkflowIcon size={18} />}
        label="limpar nós"
      />

      <TextEditorActionButton
        onClick={() => editor.chain().focus().setParagraph().run()}
        active={editor.isActive("paragraph")}
        icon={<PilcrowIcon size={18} />}
        label="parágrafo"
      />

      <TextEditorActionButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
        active={editor.isActive("heading", { level: 2 })}
        icon={<Heading2Icon size={18} />}
        label="h2"
      />

      <TextEditorActionButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
        active={editor.isActive("heading", { level: 3 })}
        icon={<Heading3Icon size={18} />}
        label="h3"
      />

      <TextEditorActionButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
        active={editor.isActive("heading", { level: 4 })}
        icon={<Heading4Icon size={18} />}
        label="h4"
      />

      <TextEditorActionButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}
        active={editor.isActive("heading", { level: 5 })}
        icon={<Heading5Icon size={18} />}
        label="h5"
      />

      <TextEditorActionButton
        onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}
        active={editor.isActive("heading", { level: 6 })}
        icon={<Heading6Icon size={18} />}
        label="h6"
      />

      <TextEditorActionButton
        onClick={() => editor.chain().focus().toggleBulletList().run()}
        active={editor.isActive("bulletList")}
        icon={<ListIcon size={18} />}
        label="lista não ordenada"
      />

      <TextEditorActionButton
        onClick={() => editor.chain().focus().toggleOrderedList().run()}
        active={editor.isActive("orderedList")}
        icon={<ListOrderedIcon size={18} />}
        label="lista ordenada"
      />

      <TextEditorActionButton
        onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        active={editor.isActive("codeBlock")}
        icon={<Code2Icon size={18} />}
        label="bloco de código"
      />

      <TextEditorActionButton
        onClick={() => editor.chain().focus().toggleBlockquote().run()}
        active={editor.isActive("blockquote")}
        icon={<QuoteIcon size={18} />}
        label="citação"
      />

      <TextEditorActionButton
        onClick={() => editor.chain().focus().setHorizontalRule().run()}
        icon={<SplitSquareHorizontalIcon size={18} />}
        label="linha horizontal"
      />

      <TextEditorActionButton
        onClick={() => editor.chain().focus().setHardBreak().run()}
        icon={<WrapTextIcon size={18} />}
        label="quebra de linha"
      />

      <TextEditorActionButton
        onClick={() => editor.chain().focus().undo().run()}
        disabled={!editor.can().chain().focus().undo().run()}
        icon={<UndoIcon size={18} />}
        label="desfazer"
      />

      <TextEditorActionButton
        onClick={() => editor.chain().focus().redo().run()}
        disabled={!editor.can().chain().focus().redo().run()}
        icon={<RedoIcon size={18} />}
        label="refazer"
      />

      <ImageUploadDialogTrigger
        uploadImage={uploadImageToGallery}
        onSuccessfulUpload={(data) => {
          editor
            .chain()
            .focus()
            .setCustomImage({
              src: data.url,
              alt_text: data.alt,
              inline: false,
              allowBase64: false,
              HTMLAttributes: [],
            })
            .run();
        }}
        onFailedUpload={(error) => {
          toast({
            title: "Erro ao fazer upload da imagem",
            description: error.message,
            variant: "destructive",
          });
        }}
      >
        <TextEditorActionButton icon={<ImageIcon size={18} />} label="imagem" />
      </ImageUploadDialogTrigger>

      <AddYoutubeVideoDialogTrigger
        onSave={(src) => {
          editor.commands.setYoutubeVideo({
            src: src,
            width: 320,
            height: 180,
          });
        }}
      >
        <TextEditorActionButton
          icon={<YoutubeIcon size={18} />}
          label="youtube"
        />
      </AddYoutubeVideoDialogTrigger>

      <LayeredImageUploadDialogTrigger
        uploadImage={uploadImageToGallery}
        onSuccessfulUpload={(data) => {
          toast({
            title: "Sucesso ao fazer upload da imagem",
            description: "Imagem adicionada com sucesso",
            variant: "default",
          });
        }}
        onSave={(data) => {
          editor
            .chain()
            .focus()
            .setCustomLayeredImage({
              layers: data,
            })
            .run();
        }}
        onFailedUpload={(error) => {
          toast({
            title: "Erro ao fazer upload da imagem",
            description: error.message,
            variant: "destructive",
          });
        }}
      >
        <TextEditorActionButton
          icon={<ImagesIcon size={18} />}
          label="imagens"
        />
      </LayeredImageUploadDialogTrigger>
    </div>
  );
}
