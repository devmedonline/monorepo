export type SimulationCategory = {
  id: string;
  name: string;
  description: string;
  publicAvailable: boolean;
  thumbnail: string;
  createdAt: Date;
  updatedAt: Date;
};

export type CreateSimulationCategoryDto = {
  name: string;
  description: string;
  thumbnail: string;
};

export type UpdateSimulationCategoryDto = Partial<CreateSimulationCategoryDto>;
