export type SimulationPhaseEssentialData = {
  id: string;
  title: string;
  thumbnail: string;
  simulationId: string;
};

export type SimulationPhase = SimulationPhaseEssentialData & {
  content: string;
};

export type CreateSimulationPhaseDto = {
  title: string;
  content: string;
  thumbnail: string;
  simulationId: string;
};

export type UpdateSimulationPhaseDto = Partial<CreateSimulationPhaseDto> & {
  id: string;
};

export type FilterSimulationPhaseDto = {
  simulationId?: string;
};
