import {
  ArrowRight,
  MessageCircleMore,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { CosmicCarousel } from "@/components/landing/cosmic-carousel";
import { Reveal } from "@/components/landing/reveal";
import type { HeroSection as HeroSectionContent } from "@/lib/landing-types";

type HeroProps = {
  hero: HeroSectionContent;
  productName: string;
  whatsappLink: string;
};

export function Hero({ hero, productName, whatsappLink }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden scroll-mt-28 pb-20 pt-32 sm:pb-24 sm:pt-36"
      aria-labelledby="hero-title"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="space-y-8">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">
                {hero.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-medium text-cyan-100">
                <ShieldCheck className="h-3.5 w-3.5" />
                {hero.badge}
              </div>
            </Reveal>

            <Reveal delay={0.12}>
              <h1
                id="hero-title"
                className="font-display text-balance text-4xl leading-tight text-white sm:text-5xl lg:text-6xl"
              >
                {hero.title}
              </h1>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="max-w-2xl text-balance text-base leading-relaxed text-slate-200/90 sm:text-lg">
                {hero.subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="flex flex-col gap-3 sm:flex-row">
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-cyan-300 px-6 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cyan-200"
                >
                  <MessageCircleMore className="h-4 w-4" />
                  {hero.primaryCtaLabel}
                </a>
                <a
                  href="#produto"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/25 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition-colors hover:border-cyan-300/40 hover:bg-white/15"
                >
                  {hero.secondaryCtaLabel}
                  <ArrowRight className="h-4 w-4" />
                </a>
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.18}>
            <div className="relative rounded-3xl border border-white/15 bg-slate-950/70 p-6 shadow-[0_12px_36px_rgba(2,6,23,0.45)]">
              <div className="noise-mask pointer-events-none absolute inset-0 rounded-3xl opacity-90" />
              <div className="relative space-y-5">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100">
                  <Sparkles className="h-3.5 w-3.5" />
                  Painel executivo do {productName}
                </div>

                <CosmicCarousel slides={hero.carouselSlides} />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

