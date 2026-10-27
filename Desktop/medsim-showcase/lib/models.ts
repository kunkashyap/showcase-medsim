import modelsJson from "@/data/models.json";

export type Vec3 = [number, number, number];

export type OrganLabel = {
  text: string;
  position: Vec3;
  note?: string;
};

export type OrganModel = {
  id: string;
  name: string;
  system: string;
  shortDescription: string;
  description: string;
  modelPath: string;
  thumbnail: string;
  scale?: number;
  initialRotation?: Vec3;
  labels?: OrganLabel[];
};

const models = modelsJson as OrganModel[];

export function getModels(): OrganModel[] {
  return models;
}

export function getModel(id: string): OrganModel | undefined {
  return models.find((model) => model.id === id);
}

export function getSystems(): string[] {
  return Array.from(new Set(models.map((model) => model.system)));
}
