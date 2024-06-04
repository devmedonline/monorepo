import { Post } from "../types/post";
import { PostImageDropdownTrigger } from "./post-image-dropdown-trigger";

type PostListItemProps = {
  post: Post;
};

export function PostListItem({ post }: PostListItemProps) {
  return (
    <li className="flex items-center gap-3">
      <PostImageDropdownTrigger post={post} />
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold text-primary line-clamp-2 leading-tight">
          {post.name}
        </h3>
        <p className="text-sm text-muted-foreground line-clamp-2">
          {post.description}
        </p>
      </div>
    </li>
  );
}
