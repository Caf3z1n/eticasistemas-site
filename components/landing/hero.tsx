import { HeroMediaCarousel } from "@/components/landing/hero-media-carousel";
import type { HeroSection as HeroSectionContent } from "@/lib/landing-types";

type HeroProps = {
  hero: HeroSectionContent;
};

export function Hero({ hero }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden scroll-mt-28 pb-18 pt-26 sm:pb-22 sm:pt-30"
      aria-labelledby="hero-title"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(3,8,18,0.12),rgba(3,8,18,0.44)_42%,rgba(2,5,14,0.08))]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-950/55 to-transparent" />
      <div className="pointer-events-none absolute left-[-12rem] top-[4.5rem] h-[28rem] w-[28rem] rounded-full bg-cyan-400/8 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10rem] top-[5.5rem] h-[24rem] w-[24rem] rounded-full bg-sky-400/8 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <div
            className="hero-entrance flex flex-wrap items-center justify-center gap-3"
            style={{ animationDelay: "40ms" }}
          >
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/78">
              {hero.eyebrow}
            </p>
          </div>

          <h1
            id="hero-title"
            className="hero-entrance mx-auto mt-5 max-w-[12ch] font-display text-4xl leading-[0.95] text-white sm:text-5xl lg:max-w-4xl lg:text-[4rem]"
            style={{ animationDelay: "120ms" }}
          >
            {hero.title}
          </h1>

          <p
            className="hero-entrance mx-auto mt-4 max-w-2xl text-base leading-relaxed text-slate-200/84 sm:text-lg"
            style={{ animationDelay: "200ms" }}
          >
            {hero.subtitle}
          </p>

          <div
            className="hero-entrance mt-6 flex flex-wrap items-center justify-center gap-2.5 text-sm text-slate-200/82"
            style={{ animationDelay: "280ms" }}
          >
            {hero.stats.map((item) => (
              <span
                key={`${item.value}-${item.label}`}
                className="rounded-full border border-white/10 bg-white/[0.04] px-3.5 py-1.5"
              >
                <strong className="font-semibold text-white">{item.value}</strong>{" "}
                <span className="text-slate-300/76">{item.label}</span>
              </span>
            ))}
          </div>
        </div>

        <div className="mt-8 sm:mt-10">
          <HeroMediaCarousel
            slides={hero.carouselSlides}
            badge={hero.badge}
            autoplayEnabled={hero.autoplayEnabled}
          />
        </div>
      </div>
    </section>
  );
}
