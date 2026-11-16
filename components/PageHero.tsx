import type { ReactNode } from "react";

export function PageHero({ eyebrow, title, description, actions }: { eyebrow: string; title: string; description: string; actions?: ReactNode }) {
  return (
    <section className="page-hero">
      <div className="orb orb-one" />
      <div className="orb orb-two" />
      <div className="site-container relative py-20 sm:py-28">
        <p className="hero-eyebrow">{eyebrow}</p>
        <h1 className="mt-5 max-w-5xl font-heading text-5xl font-bold leading-[1.03] tracking-tight text-white sm:text-6xl lg:text-7xl">{title}</h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-white/72 sm:text-xl">{description}</p>
        {actions && <div className="mt-9 flex flex-wrap gap-3">{actions}</div>}
      </div>
    </section>
  );
}
