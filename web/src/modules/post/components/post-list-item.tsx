import { Badge } from "@/shared/components/ui/badge";
import { formatEntityTimestamps } from "@/shared/lib/format-entity-timestamps";
import { Post } from "../types/post";
import { PostImageDropdownTrigger } from "./post-image-dropdown-trigger";

type PostListItemProps = {
  post: Post;
};

export function PostListItem({ post }: PostListItemProps) {
  return (
    <li className="flex items-start gap-3 w-full">
      <PostImageDropdownTrigger post={post} />
      <div className="flex flex-col gap-1 w-full">
        <h3 className="text-base font-semibold text-primary line-clamp-2 leading-tight flex items-center justify-between">
          <span>{post.title}</span>
          <Badge variant={post.publicAvailable ? "success" : "warning"}>
            {post.publicAvailable ? "público" : "rascunho"}
          </Badge>
        </h3>
        <ul>
          <li>
            <span className="text-sm text-gray-600">
              Criado por {post.author.name}
            </span>
          </li>
          <li>
            <span className="text-sm text-gray-600">
              {formatEntityTimestamps(post)}
            </span>
          </li>
          <li>
            <span className="text-sm text-gray-600">
              {post.generalCategory.name}
            </span>
          </li>
        </ul>
      </div>
    </li>
  );
}
