"use client";

import React, { useState, useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { assetUrl } from "@/lib/assets";
import type { OrganModel, OrganLabel } from "@/lib/models";

const OrganScene = dynamic(() => import("./OrganScene"), {
  ssr: false,
  loading: () => (
    <div className="flex h-full w-full min-h-[500px] flex-col items-center justify-center bg-panel p-8 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-panel border-t-accent mb-4" />
      <p className="font-heading text-[24px] font-black text-ink">
        Loading 3D Model…
      </p>
      <p className="mt-2 text-[18px] text-ink-secondary">
        Preparing WebGL hardware canvas
      </p>
    </div>
  ),
});

type OrganViewerProps = {
  model: OrganModel;
};

export function OrganViewer({ model }: OrganViewerProps) {
  const [autoRotate, setAutoRotate] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);
  const [selectedLabel, setSelectedLabel] = useState<OrganLabel | null>(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const viewerContainerRef = useRef<HTMLDivElement>(null);

  const fullModelUrl = assetUrl(model.modelPath);

  const handleResetCamera = () => {
    setResetTrigger((prev) => prev + 1);
  };

  const toggleFullscreen = () => {
    if (!viewerContainerRef.current) return;
    if (!document.fullscreenElement) {
      viewerContainerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div className="min-h-screen bg-page text-ink">
      {/* Top Header */}
      <header className="border-b-2 border-ink bg-page px-5 py-6 md:px-10">
        <div className="mx-auto flex max-w-[1920px] flex-wrap items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex min-h-touch items-center gap-2 border-2 border-ink bg-panel px-6 text-[22px] font-bold text-ink transition-colors hover:bg-ink hover:text-white focus-visible:bg-ink focus-visible:text-white"
          >
            <span aria-hidden="true">&larr;</span> Back to Gallery
          </Link>

          <span className="inline-flex border-2 border-ink px-4 py-1.5 text-[18px] font-bold">
            {model.system}
          </span>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto flex max-w-[1920px] flex-col gap-8 px-5 py-8 md:px-10 md:py-12 lg:flex-row">
        {/* Left: 3D Stage */}
        <section
          ref={viewerContainerRef}
          aria-label="3D Model Viewer"
          className="flex min-h-[500px] flex-1 flex-col border-2 border-ink bg-panel md:min-h-[680px]"
        >
          {/* Viewer Controls Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b-2 border-ink bg-white p-4">
            <span className="font-heading text-[20px] font-bold text-ink">
              3D Interactive View
            </span>

            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => setAutoRotate((prev) => !prev)}
                className={`min-h-[48px] border-2 border-ink px-5 text-[18px] font-bold transition-colors ${
                  autoRotate
                    ? "bg-accent text-white hover:bg-accent/90"
                    : "bg-panel text-ink hover:bg-ink hover:text-white"
                }`}
                title="Toggle continuous rotation"
              >
                Auto-Rotate: {autoRotate ? "ON" : "OFF"}
              </button>

              <button
                type="button"
                onClick={handleResetCamera}
                className="min-h-[48px] border-2 border-ink bg-panel px-5 text-[18px] font-bold text-ink transition-colors hover:bg-ink hover:text-white"
                title="Reset view to default angle"
              >
                Reset View
              </button>

              <button
                type="button"
                onClick={toggleFullscreen}
                className="min-h-[48px] border-2 border-ink bg-panel px-5 text-[18px] font-bold text-ink transition-colors hover:bg-ink hover:text-white"
                title="Toggle fullscreen"
              >
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              </button>
            </div>
          </div>

          {/* 3D Viewport */}
          <div className="relative flex-1 w-full min-h-[440px]">
            <OrganScene
              modelPath={fullModelUrl}
              autoRotate={autoRotate}
              resetTrigger={resetTrigger}
            />

            {/* Interaction Tips Badge */}
            <div className="pointer-events-none absolute bottom-4 left-4 z-10 hidden border-2 border-ink bg-white p-3 text-[16px] font-bold text-ink md:block">
              Click & Drag: Rotate · Scroll: Zoom · Right-Click: Pan
            </div>
          </div>
        </section>

        {/* Right: Anatomical Details Panel */}
        <aside className="flex w-full flex-col gap-6 lg:w-[480px]">
          <div className="border-2 border-ink bg-panel p-6 md:p-8">
            <h1 className="font-heading text-[48px] font-black leading-none text-ink">
              {model.name}
            </h1>

            <p className="mt-4 inline-flex border-2 border-ink bg-white px-3 py-1 text-[16px] font-bold">
              {model.system}
            </p>

            <p className="mt-6 text-[20px] font-medium leading-[1.5] text-ink">
              {model.shortDescription}
            </p>

            <hr className="my-6 border-t-2 border-ink" />

            <h2 className="font-heading text-[24px] font-bold text-ink">
              About this Organ
            </h2>

            <p className="mt-3 text-[18px] leading-[1.6] text-ink-secondary">
              {model.description}
            </p>
          </div>

          {/* Key Anatomical Landmarks */}
          {model.labels && model.labels.length > 0 && (
            <div className="border-2 border-ink bg-panel p-6 md:p-8">
              <h2 className="font-heading text-[24px] font-bold text-ink">
                Key Structures & Landmarks
              </h2>
              <p className="mt-2 text-[16px] text-ink-secondary">
                Select a landmark below to review details:
              </p>

              <div className="mt-4 flex flex-col gap-3">
                {model.labels.map((label, idx) => {
                  const isSelected = selectedLabel?.text === label.text;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() =>
                        setSelectedLabel(isSelected ? null : label)
                      }
                      className={`min-h-[52px] w-full border-2 border-ink p-4 text-left transition-colors ${
                        isSelected
                          ? "bg-accent text-white"
                          : "bg-white text-ink hover:bg-ink hover:text-white"
                      }`}
                    >
                      <div className="flex items-center justify-between text-[18px] font-bold">
                        <span>{label.text}</span>
                        <span aria-hidden="true">{isSelected ? "−" : "+"}</span>
                      </div>
                      {isSelected && label.note && (
                        <p className="mt-2 border-t border-current pt-2 text-[16px] font-normal leading-snug">
                          {label.note}
                        </p>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </aside>
      </main>
    </div>
  );
}
