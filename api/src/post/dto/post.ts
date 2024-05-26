export type DetailedPostDto = {
  author: Author;
  generalCategory: GeneralCategory;
  tags: Tag[];
};

type Author = {
  id: string;
  name: string;
  avatar: string;
};

type GeneralCategory = {
  id: string;
  name: string;
  description: string;
  publicAvailable: boolean;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
};

type Tag = {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};
