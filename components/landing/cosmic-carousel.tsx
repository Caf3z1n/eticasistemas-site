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
    <div className="relative overflow-hidden rounded-2xl border border-cyan-300/30 bg-slate-950/75 p-4 shadow-[0_10px_26px_rgba(5,8,18,0.45)]">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_15%_10%,rgba(56,189,248,0.12),transparent_45%),radial-gradient(circle_at_85%_20%,rgba(20,184,166,0.08),transparent_45%)]" />

      <div className="relative">
        <div className="mb-3 flex items-center justify-between gap-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200">
            <Images className="h-3.5 w-3.5" />
            Telas do sistema
          </div>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={goPrev}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 transition-colors hover:bg-white/20"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={goNext}
              className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white/90 transition-colors hover:bg-white/20"
              aria-label="Próximo slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div
          className="relative aspect-[16/9] overflow-hidden rounded-xl border border-white/15 bg-slate-900/70"
          aria-live="polite"
        >
          <Image
            key={activeSlide.id}
            src={activeSlide.src}
            alt={activeSlide.alt}
            fill
            priority={activeIndex === 0}
            sizes="(max-width: 768px) 100vw, 45vw"
            className="object-cover"
          />
        </div>

        <p className="mt-3 line-clamp-1 text-xs font-medium uppercase tracking-[0.1em] text-cyan-100/90">
          {activeSlide.caption}
        </p>

        <div className="mt-3 flex items-center gap-2">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              type="button"
              onClick={() => goTo(index)}
              className={cn(
                "h-1.5 rounded-full transition-all",
                index === activeIndex
                  ? "w-10 bg-cyan-300"
                  : "w-5 bg-white/25 hover:bg-white/40"
              )}
              aria-label={`Ir para o slide ${index + 1}`}
              aria-current={index === activeIndex ? "true" : "false"}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

