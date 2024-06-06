import { GeneralCategory } from "@/modules/general-category/types/general-category";
import { PaginationInput } from "@/shared/types/pagination";

export enum PostPublicAvailable {
  Draft = "draft",
  Published = "published",
}

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

export type Author = {
  id: string;
  name: string;
  avatar: string;
};

export type Post = {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  authorId: string;
  language: string;
  publicAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  generalCategoryId: string;
  generalCategory: GeneralCategory;
  author: Author;
  tags: unknown[];
};
