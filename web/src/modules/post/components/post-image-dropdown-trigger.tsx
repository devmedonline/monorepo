import Image from "next/image";
import { Post } from "../types/post";

import { Button } from "@/shared/components/ui/button";
import {
  ArrowDownRight,
  EyeIcon,
  EyeOffIcon,
  PencilIcon,
  Trash2Icon,
} from "lucide-react";
import Link from "next/link";
import { PostDeleteTrigger } from "./post-delete-trigger";
import { UpdatePostVisibilityToggle } from "./update-post-visibility-toggle";

type PostImageDropdownTriggerProps = {
  post: Post;
};

export function PostImageDropdownTrigger({
  post,
}: PostImageDropdownTriggerProps) {
  const visibilityLabel = post.publicAvailable
    ? "Ocultar publicação"
    : "Exibir publicação";
  return (
    <button className="rounded-xl rounded-tl bg-secondary flex-shrink-0 cursor-pointer overflow-hidden relative group">
      <Image
        width={64}
        height={64}
        src={post.thumbnail}
        alt={post.name}
        className="aspect-square object-cover"
      />

      <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity grid grid-cols-2 grid-rows-2">
        <span
          className="w-full h-full flex items-center justify-center text-white"
          title="Ver detalhes"
          aria-label="Ver detalhes"
        >
          <ArrowDownRight size={16} />
        </span>

        <UpdatePostVisibilityToggle
          id={post.id}
          publicAvailable={post.publicAvailable}
          title={visibilityLabel}
          aria-label={visibilityLabel}
          variant={post.publicAvailable ? "destructive" : "default"}
          size="icon"
          className="w-full h-full rounded-none"
        >
          {post.publicAvailable ? (
            <EyeIcon size={16} />
          ) : (
            <EyeOffIcon size={16} />
          )}
        </UpdatePostVisibilityToggle>

        <Button
          variant="secondary"
          size="icon"
          className="w-full h-full rounded-none"
          title="Editar publicação"
          aria-label="Editar publicação"
          asChild
        >
          <Link href={`/post/${post.id}`}>
            <PencilIcon size={16} />
          </Link>
        </Button>

        <PostDeleteTrigger post={post}>
          <Button
            variant="destructive"
            size="icon"
            className="w-full h-full rounded-none"
            title="Excluir publicação"
            aria-label="Excluir publicação"
          >
            <Trash2Icon size={16} />
          </Button>
        </PostDeleteTrigger>
      </div>
    </button>
  );
}
