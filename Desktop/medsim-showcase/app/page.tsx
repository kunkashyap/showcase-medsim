import { Suspense } from "react";
import { Gallery } from "@/components/Gallery";
import { getModels, getSystems } from "@/lib/models";

export default function HomePage() {
  const models = getModels();
  const systems = getSystems();

  return (
    <main id="main">
      <Suspense
        fallback={
          <div className="min-h-screen bg-page p-8 text-[20px] font-bold text-ink">
            Loading gallery…
          </div>
        }
      >
        <Gallery models={models} systems={systems} />
      </Suspense>
    </main>
  );
}
