import { Author } from "@/modules/post/types/post";
import { SimulationCategory } from "@/modules/simulation-category/types/simulation-category";
import { PaginationInput } from "@/shared/types/pagination";

export type CreateSimulationDto = {
  title: string;
  content: string;
  thumbnail: string;
  publicAvailable: "draft" | "published" | "any";
  simulationCategoryId: string;
};

export type FilterSimulationDto = PaginationInput & {
  publicAvailable?: "draft" | "published" | "any";
  simulationCategoryId?: string;
  authorId?: string;
  tagId?: string;
};

export type UpdateSimulationDto = Partial<CreateSimulationDto>;

export type Simulation = {
  id: string;
  title: string;
  content: string;
  thumbnail: string;
  authorId: string;
  author: Author;
  publicAvailable: boolean;
  createdAt: string;
  updatedAt: string;
  simulationCategoryId: string;
  simulationCategory: SimulationCategory;
  phases: SimulationPhaseEssentialData[];
};

export type SimulationPhaseEssentialData = {
  id: string;
  title: string;
  thumbnail: string;
};

export type SimulationPhase = SimulationPhaseEssentialData & {
  content: string;
};
