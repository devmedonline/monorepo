import { PaginationInput } from "@/shared/types/pagination";

export type CreatePostDto = {
  title: string;
  content: string;
  thumbnail: string;
  publicAvailable: "draft" | "published" | "any";
  generalCategoryId: string;
};

export type FilterPostDto = PaginationInput & {
  publicAvailable?: "draft" | "published" | "any";
  generalCategoryId?: string;
  authorId?: string;
  tagId?: string;
};

export type UpdatePostDto = Partial<CreatePostDto>;

export type Post = any;
