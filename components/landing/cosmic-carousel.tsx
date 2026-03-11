"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Images } from "lucide-react";

import type { HeroCarouselImageSlide } from "@/lib/landing-types";
import { cn } from "@/lib/utils";

type CosmicCarouselProps = {
  slides: HeroCarouselImageSlide[];
};

const ROTATE_MS = 6500;

export function CosmicCarousel({ slides }: CosmicCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => setReduceMotion(mediaQuery.matches);

    onChange();
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (reduceMotion || slides.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, ROTATE_MS);

    return () => window.clearInterval(intervalId);
  }, [reduceMotion, slides.length]);

  const activeSlide = slides[activeIndex];

  if (!activeSlide) {
    return null;
  }

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  const goPrev = () => {
    setActiveIndex((current) => (current - 1 + slides.length) % slides.length);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % slides.length);
  };

  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-[2rem] bg-[radial-gradient(circle_at_18%_20%,rgba(56,189,248,0.14),transparent_28%),radial-gradient(circle_at_80%_18%,rgba(45,212,191,0.08),transparent_24%)] blur-2xl" />

      <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(8,17,32,0.96),rgba(3,9,19,0.94))] p-4 shadow-[0_28px_80px_rgba(2,6,23,0.48)] sm:p-5">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
              <Images className="h-3.5 w-3.5" />
              Telas reais do sistema
            </div>
            <p className="mt-2 text-sm leading-relaxed text-slate-300/78">
              Clique nas telas para navegar pelo fluxo principal do produto.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium uppercase tracking-[0.14em] text-slate-100">
              {String(activeIndex + 1).padStart(2, "0")}/
              {String(slides.length).padStart(2, "0")}
            </div>
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 transition-colors hover:bg-white/20"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 transition-colors hover:bg-white/20"
              aria-label="Proximo slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden rounded-[1.75rem] border border-white/10 bg-slate-950/82">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-rose-400/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-amber-300/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
            </div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200/78">
              {activeSlide.highlight ?? "Tela em destaque"}
            </p>
          </div>

          <div
            className="relative aspect-[1405/897] overflow-hidden bg-[radial-gradient(circle_at_50%_12%,rgba(15,23,42,0.4),transparent_35%),linear-gradient(180deg,rgba(3,9,19,0.15),rgba(3,9,19,0.6))] p-2 sm:p-3 md:p-4"
            aria-live="polite"
          >
            <Image
              key={activeSlide.id}
              src={activeSlide.src}
              alt={activeSlide.alt}
              fill
              priority={activeIndex === 0}
              sizes="(max-width: 1024px) 100vw, 62vw"
              className="object-contain object-top px-2 pb-2 pt-3 sm:px-3 sm:pb-3"
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-slate-950 via-slate-950/70 to-transparent" />

            <div className="absolute bottom-4 left-4 max-w-[22rem] rounded-2xl border border-white/10 bg-slate-950/76 px-4 py-3 backdrop-blur-md sm:bottom-5 sm:left-5">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200/80">
                {activeSlide.highlight ?? "Tela principal"}
              </p>
              <p className="mt-2 font-display text-xl text-white">
                {activeSlide.caption}
              </p>
              {activeSlide.detail ? (
                <p className="mt-1 text-sm leading-relaxed text-slate-300/80">
                  {activeSlide.detail}
                </p>
              ) : null}
            </div>
          </div>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-3">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(index)}
              className={cn(
                "group rounded-2xl border p-2 text-left transition-all",
                index === activeIndex
                  ? "border-cyan-300/40 bg-cyan-300/12 shadow-[0_16px_32px_rgba(8,47,73,0.28)]"
                  : "border-white/10 bg-white/[0.03] hover:border-cyan-300/25 hover:bg-white/[0.05]"
              )}
              aria-label={`Ir para ${slide.caption}`}
              aria-current={index === activeIndex ? "true" : "false"}
            >
              <div className="flex items-center gap-3">
                <div className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-white/10 bg-slate-900">
                  <Image
                    src={slide.src}
                    alt={slide.alt}
                    fill
                    sizes="96px"
                    className="object-cover object-top transition-transform duration-300 group-hover:scale-[1.02]"
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold uppercase tracking-[0.08em] text-white">
                    {slide.caption}
                  </p>
                  {slide.detail ? (
                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-slate-400/90">
                      {slide.detail}
                    </p>
                  ) : null}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
