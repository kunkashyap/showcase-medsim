import { notFound } from "next/navigation";
import { getModel, getModels } from "@/lib/models";
import { OrganViewer } from "@/components/OrganViewer";

type OrganPageProps = {
  params: { id: string };
};

export function generateStaticParams() {
  return getModels().map((model) => ({ id: model.id }));
}

export function generateMetadata({ params }: OrganPageProps) {
  const model = getModel(params.id);
  return {
    title: model ? `${model.name} · MedSim 3D` : "Model · MedSim 3D",
  };
}

export default function OrganPage({ params }: OrganPageProps) {
  const model = getModel(params.id);
  if (!model) notFound();

  return <OrganViewer model={model} />;
}
