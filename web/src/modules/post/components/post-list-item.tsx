import { PublicationStatusBadge } from "@/shared/components/publication-status-badge";
import { formatEntityTimestamps } from "@/shared/lib/format-entity-timestamps";
import { LucideClock, LucideGrid2X2, LucidePen } from "lucide-react";
import { Post, PostPublicAvailable } from "../types/post";
import { PostImageDropdownTrigger } from "./post-image-dropdown-trigger";

type PostListItemProps = {
  post: Post;
};

export function PostListItem({ post }: PostListItemProps) {
  return (
    <li className="flex items-start gap-3 w-full">
      <PostImageDropdownTrigger post={post} />
      <div className="flex flex-col gap-1 w-full">
        <h3 className="text-base font-semibold text-primary line-clamp-2 leading-tight">
          {post.title}
        </h3>

        <ul>
          <li>
            <span className="text-sm text-gray-600 flex items-center gap-1">
              <LucidePen className="w-3 h-3 inline-block flex-shrink-0" />
              Criado por {post.author.name}
            </span>
          </li>
          <li>
            <span className="text-sm text-gray-600 flex items-center gap-1">
              <LucideClock className="w-3 h-3 inline-block flex-shrink-0" />
              {formatEntityTimestamps(post)}
            </span>
          </li>
          <li>
            <span className="text-sm text-gray-600 flex items-center gap-1">
              <LucideGrid2X2 className="w-3 h-3 inline-block flex-shrink-0" />
              {post.generalCategory.name}
            </span>
          </li>
        </ul>

        <PublicationStatusBadge
          status={
            post.publicAvailable
              ? PostPublicAvailable.Published
              : PostPublicAvailable.Draft
          }
        />
      </div>
    </li>
  );
}
