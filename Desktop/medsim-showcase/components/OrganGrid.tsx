import { OrganCard } from "@/components/OrganCard";
import type { OrganModel } from "@/lib/models";

type OrganGridProps = {
  models: OrganModel[];
  kiosk?: boolean;
};

export function OrganGrid({ models, kiosk = false }: OrganGridProps) {
  if (models.length === 0) {
    return (
      <div
        role="status"
        className="border-2 border-ink bg-panel p-8 text-[20px] leading-[1.5] text-ink"
      >
        <p className="font-heading text-[32px] font-extrabold">No models to show</p>
        <p className="mt-3 text-ink-secondary">
          Add entries to <code className="font-bold">data/models.json</code> or
          choose another system filter.
        </p>
      </div>
    );
  }

  const gridClass = kiosk
    ? "grid grid-cols-1 gap-8 md:grid-cols-2 ultra:grid-cols-3"
    : "grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 ultra:grid-cols-4";

  return (
    <ul className={gridClass}>
      {models.map((model) => (
        <li key={model.id} className="min-w-0">
          <OrganCard model={model} kiosk={kiosk} />
        </li>
      ))}
    </ul>
  );
}
