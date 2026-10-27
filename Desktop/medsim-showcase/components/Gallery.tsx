"use client";

import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/Header";
import { OrganGrid } from "@/components/OrganGrid";
import { SystemFilter } from "@/components/SystemFilter";
import type { OrganModel } from "@/lib/models";

type GalleryProps = {
  models: OrganModel[];
  systems: string[];
};

export function Gallery({ models, systems }: GalleryProps) {
  const searchParams = useSearchParams();
  const kiosk = searchParams.get("kiosk") === "1";
  const [system, setSystem] = useState("All");

  const visible = useMemo(() => {
    if (system === "All") return models;
    return models.filter((model) => model.system === system);
  }, [models, system]);

  return (
    <>
      <Header
        title="MedSim"
        subtitle="3D anatomical models for bright venues and touch displays. Tap a card to step into the virtual dome."
      >
        {!kiosk ? (
          <SystemFilter
            systems={systems}
            selected={system}
            onSelect={setSystem}
          />
        ) : null}
      </Header>
      <div className="mx-auto max-w-[1920px] px-5 py-8 md:px-10 md:py-12">
        <OrganGrid models={visible} kiosk={kiosk} />
      </div>
    </>
  );
}
