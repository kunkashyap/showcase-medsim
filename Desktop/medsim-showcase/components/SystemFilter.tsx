"use client";

type SystemFilterProps = {
  systems: string[];
  selected: string;
  onSelect: (system: string) => void;
};

export function SystemFilter({
  systems,
  selected,
  onSelect,
}: SystemFilterProps) {
  const chips = ["All", ...systems];

  return (
    <div
      role="group"
      aria-label="Filter models by body system"
      className="flex flex-wrap gap-3"
    >
      {chips.map((system) => {
        const isSelected = system === selected;
        return (
          <button
            key={system}
            type="button"
            onClick={() => onSelect(system)}
            aria-pressed={isSelected}
            className={`min-h-touch min-w-touch rounded-full border-2 border-ink px-6 text-[22px] font-bold leading-none transition-colors ${
              isSelected
                ? "bg-ink text-white"
                : "bg-panel text-ink hover:bg-ink hover:text-white active:bg-ink active:text-white"
            }`}
          >
            {system}
          </button>
        );
      })}
    </div>
  );
}
