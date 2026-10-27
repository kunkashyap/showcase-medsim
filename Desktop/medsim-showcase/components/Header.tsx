import type { ReactNode } from "react";

type HeaderProps = {
  title: string;
  subtitle: string;
  children?: ReactNode;
};

export function Header({ title, subtitle, children }: HeaderProps) {
  return (
    <header className="border-b-2 border-ink bg-page px-5 py-8 md:px-10 md:py-12">
      <div className="mx-auto max-w-[1920px]">
        <p className="text-[16px] font-bold uppercase tracking-[0.12em] text-accent">
          Anatomical showcase
        </p>
        <h1 className="mt-3 font-heading text-[56px] font-black leading-none tracking-tight text-ink md:text-[72px]">
          {title}
        </h1>
        <p className="mt-4 max-w-4xl text-[20px] leading-[1.5] text-ink-secondary md:text-[22px]">
          {subtitle}
        </p>
        {children ? <div className="mt-8">{children}</div> : null}
      </div>
    </header>
  );
}
