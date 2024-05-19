export type GeneralCategory = {
  id: string;
  name: string;
  description: string;
  publicAvailable: boolean;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateGeneralCategoryDto = {
  name: string;
  description: string;
  thumbnail: string;
};

export type UpdateGeneralCategoryDto = Partial<CreateGeneralCategoryDto>;
