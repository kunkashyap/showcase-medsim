"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { assetUrl } from "@/lib/assets";
import type { OrganModel } from "@/lib/models";

type OrganCardProps = {
  model: OrganModel;
  kiosk?: boolean;
};

function ArrowIcon() {
  return (
    <svg
      aria-hidden="true"
      width="28"
      height="28"
      viewBox="0 0 24 24"
      fill="none"
      className="shrink-0"
    >
      <path
        d="M5 12h14M13 6l6 6-6 6"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
      />
    </svg>
  );
}

export function OrganCard({ model, kiosk = false }: OrganCardProps) {
  const [thumbFailed, setThumbFailed] = useState(false);
  const reduceMotion = useReducedMotion();
  const thumbSrc = assetUrl(model.thumbnail);

  return (
    <motion.article
      initial={reduceMotion ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28 }}
      className="h-full"
    >
      <Link
        href={`/organ/${model.id}`}
        aria-label={`Enter dome for ${model.name}`}
        onKeyDown={(event) => {
          if (event.key === " ") {
            event.preventDefault();
            event.currentTarget.click();
          }
        }}
        className="group flex h-full flex-col border-2 border-ink bg-panel text-ink no-underline transition-colors hover:bg-ink hover:text-white focus-visible:bg-ink focus-visible:text-white"
      >
        <div className="relative aspect-[16/10] w-full overflow-hidden border-b-2 border-ink bg-white">
          {thumbFailed ? (
            <div className="flex h-full w-full items-center justify-center bg-accent px-4 text-center">
              <span
                className={`font-heading font-extrabold leading-tight text-white ${
                  kiosk ? "text-[36px]" : "text-[28px] md:text-[32px]"
                }`}
              >
                {model.name}
              </span>
            </div>
          ) : (
            <Image
              src={thumbSrc}
              alt={`${model.name} thumbnail`}
              fill
              unoptimized
              sizes="(min-width: 1920px) 25vw, (min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
              className="object-cover"
              onError={() => setThumbFailed(true)}
            />
          )}
        </div>

        <div className={`flex flex-1 flex-col ${kiosk ? "p-7" : "p-5 md:p-6"}`}>
          <h2
            className={`font-heading font-extrabold leading-tight ${
              kiosk ? "text-[40px]" : "text-[32px] md:text-[36px]"
            }`}
          >
            {model.name}
          </h2>

          <p className="mt-3 inline-flex w-fit border-2 border-current px-3 py-1 text-[16px] font-bold leading-none">
            {model.system}
          </p>

          <p className="mt-4 line-clamp-3 flex-1 text-[20px] leading-[1.5] text-ink-secondary group-hover:text-white group-focus-visible:text-white">
            {model.shortDescription}
          </p>

          <span className="mt-6 inline-flex min-h-touch w-full items-center justify-center gap-3 border-2 border-current bg-accent px-4 text-[22px] font-bold text-white group-hover:bg-white group-hover:text-ink group-focus-visible:bg-white group-focus-visible:text-ink">
            Enter Dome
            <ArrowIcon />
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
