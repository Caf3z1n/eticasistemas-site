"use client";

import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  ShieldCheck,
} from "lucide-react";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";

import type { HeroCarouselImageSlide } from "@/lib/landing-types";
import { cn } from "@/lib/utils";

type HeroMediaCarouselProps = {
  slides: HeroCarouselImageSlide[];
  badge: string;
  autoplayEnabled: boolean;
};

type PlaybackState = {
  slideId: string;
  currentTime: number;
  duration: number;
};

const AUTOPLAY_MS = 6200;

export function HeroMediaCarousel({
  slides,
  badge,
  autoplayEnabled,
}: HeroMediaCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isAutoplayEnabled, setIsAutoplayEnabled] = useState(autoplayEnabled);
  const [playbackState, setPlaybackState] = useState<PlaybackState>({
    slideId: "",
    currentTime: 0,
    duration: 0,
  });
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeVideoRef = useRef<HTMLVideoElement | null>(null);
  const advanceTimeoutRef = useRef<number | null>(null);
  const progressFillRef = useRef<HTMLSpanElement | null>(null);
  const progressFrameRef = useRef<number | null>(null);
  const hasUserToggledAutoplayRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onChange = () => {
      setReduceMotion(mediaQuery.matches);
    };

    onChange();
    mediaQuery.addEventListener("change", onChange);

    return () => mediaQuery.removeEventListener("change", onChange);
  }, [autoplayEnabled]);

  const stopProgressTracking = () => {
    if (progressFrameRef.current !== null) {
      window.cancelAnimationFrame(progressFrameRef.current);
      progressFrameRef.current = null;
    }
  };

  const clearAdvanceTimeout = () => {
    if (advanceTimeoutRef.current !== null) {
      window.clearTimeout(advanceTimeoutRef.current);
      advanceTimeoutRef.current = null;
    }
  };

  const setProgressVisual = (progress: number) => {
    if (!progressFillRef.current) {
      return;
    }

    const clamped = Math.max(0, Math.min(progress, 1));
    progressFillRef.current.style.transform = `scaleX(${clamped})`;
  };

  const updatePlaybackState = (
    slideId: string,
    currentTime: number,
    duration: number
  ) => {
    const nextCurrentTime = Number.isFinite(currentTime)
      ? Math.max(0, Math.floor(currentTime))
      : 0;
    const nextDuration = Number.isFinite(duration)
      ? Math.max(0, Math.round(duration))
      : 0;

    setPlaybackState((current) => {
      if (
        current.slideId === slideId &&
        current.currentTime === nextCurrentTime &&
        current.duration === nextDuration
      ) {
        return current;
      }

      return {
        slideId,
        currentTime: nextCurrentTime,
        duration: nextDuration,
      };
    });
  };

  useEffect(() => {
    return () => {
      clearAdvanceTimeout();
      stopProgressTracking();
    };
  }, []);

  useEffect(() => {
    const activeSlide = slides[activeIndex];

    if (!activeSlide || activeSlide.videoSrc) {
      return;
    }

    clearAdvanceTimeout();
    stopProgressTracking();
    setProgressVisual(0);

    if (!isAutoplayEnabled || slides.length <= 1) {
      return;
    }

    const startedAt = window.performance.now();

    const tick = (now: number) => {
      const elapsed = now - startedAt;
      const nextProgress = Math.min(elapsed / AUTOPLAY_MS, 1);

      setProgressVisual(nextProgress);
      updatePlaybackState(
        activeSlide.id,
        (AUTOPLAY_MS * nextProgress) / 1000,
        AUTOPLAY_MS / 1000
      );

      if (nextProgress >= 1) {
        setActiveIndex((current) => (current + 1) % slides.length);
        progressFrameRef.current = null;
        return;
      }

      progressFrameRef.current = window.requestAnimationFrame(tick);
    };

    progressFrameRef.current = window.requestAnimationFrame(tick);

    return () => stopProgressTracking();
  }, [activeIndex, isAutoplayEnabled, slides]);

  useEffect(() => {
    const activeSlide = slides[activeIndex];

    if (!activeSlide?.videoSrc) {
      return;
    }

    clearAdvanceTimeout();
    stopProgressTracking();
    setProgressVisual(0);

    const video = activeVideoRef.current;

    if (!video) {
      return;
    }

    video.currentTime = 0;

    const trackVideoFrame = () => {
      const nextDuration = Number.isFinite(video.duration) ? video.duration : 0;
      const nextCurrentTime = Number.isFinite(video.currentTime)
        ? video.currentTime
        : 0;

      setProgressVisual(
        nextDuration > 0 ? Math.min(nextCurrentTime / nextDuration, 1) : 0
      );
      updatePlaybackState(activeSlide.id, nextCurrentTime, nextDuration);

      if (!video.paused && !video.ended) {
        progressFrameRef.current = window.requestAnimationFrame(trackVideoFrame);
      } else {
        progressFrameRef.current = null;
      }
    };

    const startTracking = () => {
      stopProgressTracking();
      progressFrameRef.current = window.requestAnimationFrame(trackVideoFrame);
    };

    void video.play().then(startTracking).catch(() => undefined);

    return () => {
      stopProgressTracking();
      video.pause();

      if (video.currentTime > 0) {
        video.currentTime = 0;
      }
    };
  }, [activeIndex, slides]);

  if (slides.length === 0) {
    return null;
  }

  const activeSlide = slides[activeIndex] ?? slides[0];
  const shouldAutoAdvance = isAutoplayEnabled && slides.length > 1;
  const shouldLoopCurrentVideo = !shouldAutoAdvance;
  const activePlaybackState =
    playbackState.slideId === activeSlide.id
      ? playbackState
      : {
          slideId: activeSlide.id,
          currentTime: 0,
          duration: activeSlide.videoSrc ? 0 : AUTOPLAY_MS / 1000,
        };

  const goTo = (index: number) => {
    clearAdvanceTimeout();
    setActiveIndex((index + slides.length) % slides.length);
  };

  const handleVideoEnded = (video: HTMLVideoElement) => {
    const slideId = video.dataset.slideId ?? activeSlide.id;
    const nextDuration = Number.isFinite(video.duration) ? video.duration : 0;

    setProgressVisual(1);
    updatePlaybackState(slideId, nextDuration, nextDuration);

    if (!shouldAutoAdvance) {
      return;
    }

    clearAdvanceTimeout();
    advanceTimeoutRef.current = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
      advanceTimeoutRef.current = null;
    }, 220);
  };

  const formatPlaybackTime = (value: number) => {
    if (!Number.isFinite(value) || value <= 0) {
      return "00:00";
    }

    const totalSeconds = Math.floor(value);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0"
    )}`;
  };

  const handleTabKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        event.preventDefault();
        goTo(index + 1);
        tabRefs.current[(index + 1) % slides.length]?.focus();
        break;
      case "ArrowLeft":
      case "ArrowUp":
        event.preventDefault();
        goTo(index - 1);
        tabRefs.current[(index - 1 + slides.length) % slides.length]?.focus();
        break;
      case "Home":
        event.preventDefault();
        goTo(0);
        tabRefs.current[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        goTo(slides.length - 1);
        tabRefs.current[slides.length - 1]?.focus();
        break;
      default:
        break;
    }
  };

  return (
    <div
      id="hero-media-carousel"
      className="hero-entrance relative"
      style={{ animationDelay: "220ms" }}
    >
      <div className="pointer-events-none absolute inset-x-12 top-8 h-44 rounded-full bg-cyan-300/12 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-24 bottom-2 h-28 rounded-full bg-sky-400/10 blur-3xl" />

      <div className="relative overflow-hidden rounded-[2.2rem] border border-white/12 bg-[linear-gradient(160deg,rgba(7,16,29,0.98),rgba(4,10,20,0.98))] shadow-[0_32px_90px_rgba(2,6,23,0.46)]">
        <div className="flex flex-col gap-4 border-b border-white/10 px-5 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-3.5 py-1.5 text-[11px] font-medium text-cyan-100/88">
              <ShieldCheck className="h-3.5 w-3.5" />
              {badge}
            </div>
            <h2 className="mt-3 font-display text-2xl leading-tight text-white sm:text-[2.1rem]">
              Veja o sistema em ação
            </h2>
          </div>

          <div className="flex items-center gap-2 self-start lg:self-auto">
            <button
              type="button"
              onClick={() => {
                hasUserToggledAutoplayRef.current = true;
                setIsAutoplayEnabled((current) => !current);
              }}
              aria-pressed={shouldAutoAdvance}
              title={
                reduceMotion
                  ? "Seu navegador informou preferencia por menos movimento, mas o autoplay segue disponivel para apresentacao."
                  : undefined
              }
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3.5 py-2 text-[11px] font-medium uppercase tracking-[0.16em] transition-colors",
                shouldAutoAdvance
                  ? "border-cyan-300/24 bg-cyan-300/10 text-cyan-50 hover:bg-cyan-300/14"
                  : "border-white/12 bg-white/[0.04] text-slate-200 hover:bg-white/[0.08]"
              )}
              aria-label={
                shouldAutoAdvance
                  ? "Pausar troca automatica das telas"
                  : "Ativar troca automatica das telas"
              }
            >
              {shouldAutoAdvance ? (
                <Pause className="h-3.5 w-3.5" />
              ) : (
                <Play className="h-3.5 w-3.5" />
              )}
              {shouldAutoAdvance ? "Autoplay ligado" : "Autoplay pausado"}
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex - 1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white transition-colors hover:bg-white/[0.08]"
              aria-label="Slide anterior"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={() => goTo(activeIndex + 1)}
              className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/12 bg-white/[0.04] text-white transition-colors hover:bg-white/[0.08]"
              aria-label="Proximo slide"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="p-3 sm:p-4 lg:p-5">
          <div
            role="tablist"
            aria-label="Slides do hero do Posto Agil"
            className="mb-4 grid gap-2 sm:grid-cols-3"
          >
            {slides.map((slide, index) => {
              const isActive = index === activeIndex;
              const shortLabel = slide.shortLabel ?? slide.caption;

              return (
                <button
                  key={slide.id}
                  id={`hero-carousel-tab-${slide.id}`}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  type="button"
                  role="tab"
                  tabIndex={isActive ? 0 : -1}
                  aria-selected={isActive}
                  aria-controls="hero-carousel-panel"
                  onClick={() => goTo(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                  className={cn(
                    "overflow-hidden rounded-[1.35rem] border px-4 py-3 text-left transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-200/70",
                    isActive
                      ? "border-cyan-300/28 bg-cyan-300/10 text-white shadow-[0_18px_32px_rgba(8,47,73,0.22)]"
                      : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/18 hover:bg-white/[0.06] hover:text-white"
                  )}
                >
                  <span className="flex min-w-0 items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-200/78">
                    <span>{String(index + 1).padStart(2, "0")}</span>
                    <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70" />
                    <span className="truncate">{shortLabel}</span>
                  </span>
                  <span className="mt-2 block font-display text-[1.4rem] leading-[1.08] text-white sm:text-[1.5rem]">
                    {slide.caption}
                  </span>
                  {slide.detail ? (
                    <span className="mt-2 block text-[0.98rem] leading-[1.6] text-slate-300/82">
                      {slide.detail}
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div
            className="relative min-h-[26rem] overflow-hidden rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(6,13,25,0.96),rgba(3,9,18,0.98))] sm:min-h-[33rem] lg:min-h-[43rem]"
            role="tabpanel"
            id="hero-carousel-panel"
            aria-labelledby={`hero-carousel-tab-${activeSlide.id}`}
            aria-live="polite"
          >
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(14,165,233,0.14),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.015),transparent_42%)]" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-950/26 to-transparent" />
            <div className="absolute inset-x-3 top-3 z-20 sm:inset-x-5 sm:top-4">
              <div className="flex items-center gap-2.5 rounded-full border border-white/10 bg-slate-950/68 px-2.5 py-1.5 shadow-[0_16px_40px_rgba(2,6,23,0.32)] backdrop-blur-xl sm:px-3 sm:py-2">
                <div className="hidden min-w-fit items-center gap-2 rounded-full border border-cyan-300/18 bg-cyan-300/8 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100/82 sm:inline-flex">
                  <span>{String(activeIndex + 1).padStart(2, "0")}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-cyan-300/70" />
                  <span className="max-w-[15rem] truncate">
                    {activeSlide.shortLabel ?? activeSlide.caption}
                  </span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-1 flex items-center justify-between gap-3">
                    <span className="truncate text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-100/74">
                      Progresso do video
                    </span>
                    <span className="text-[10px] font-medium uppercase tracking-[0.16em] text-slate-300/74">
                      {shouldAutoAdvance ? "Troca ao finalizar" : "Tela fixa"}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/7">
                    <span
                      ref={progressFillRef}
                      className="block h-full origin-left rounded-full bg-[linear-gradient(90deg,rgba(34,211,238,0.78),rgba(125,211,252,0.96))] will-change-transform"
                      style={{ transform: "scaleX(0)" }}
                    />
                  </div>
                </div>
                <span className="hidden min-w-[5rem] text-right text-[11px] font-medium tabular-nums text-slate-200/74 sm:block">
                  {formatPlaybackTime(activePlaybackState.currentTime)}/
                  {formatPlaybackTime(activePlaybackState.duration)}
                </span>
              </div>
            </div>

            <div key={activeSlide.id} className="hero-panel-swap absolute inset-0">
              <div className="absolute inset-x-0 bottom-0 top-[3.95rem] sm:top-[4.35rem]">
                {activeSlide.videoSrc ? (
                  activeSlide.videoLayout === "smartagil" ? (
                    <div className="relative mx-auto grid h-full min-h-0 max-w-[78rem] grid-rows-[minmax(0,1fr)_auto] gap-4 px-3 py-4 sm:gap-5 sm:px-5 sm:py-6 lg:grid-cols-[minmax(26rem,34rem)_minmax(22rem,27rem)] lg:grid-rows-none lg:justify-center lg:gap-8 lg:px-8 lg:py-8 xl:grid-cols-[34rem_28rem]">
                      <div className="pointer-events-none absolute inset-x-[16%] top-[16%] h-56 rounded-full bg-cyan-300/12 blur-3xl" />
                      <div className="pointer-events-none absolute inset-y-[24%] left-[16%] hidden w-56 rounded-full bg-sky-400/10 blur-3xl lg:block" />

                      <div className="relative z-10 order-2 mx-auto grid max-w-[44rem] grid-cols-[4.5rem_minmax(0,1fr)] items-center gap-3 text-left sm:grid-cols-[5.25rem_minmax(0,1fr)] sm:gap-4 lg:order-none lg:mx-0 lg:grid-cols-[11rem_minmax(0,1fr)] lg:gap-8 xl:grid-cols-[12rem_minmax(0,1fr)]">
                        <div className="mx-auto w-[4.5rem] shrink-0 sm:w-[5.25rem] lg:mx-0 lg:w-[11rem] xl:w-[12rem]">
                          <Image
                            src={activeSlide.src}
                            alt=""
                            width={608}
                            height={766}
                            sizes="(min-width: 1280px) 12rem, (min-width: 1024px) 11rem, 5.25rem"
                            className="h-auto w-full object-contain drop-shadow-[0_30px_36px_rgba(2,6,23,0.4)]"
                          />
                        </div>

                        <div className="min-w-0 text-left lg:max-w-[26rem]">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-cyan-200/78">
                            SmartAgil na pista
                          </p>
                          <p className="mt-1.5 max-w-[10ch] text-[1.2rem] leading-[0.96] text-slate-50 sm:mt-2 sm:text-[1.45rem] lg:max-w-[12ch] lg:text-[2.2rem]">
                            Venda concluida na pista com o mesmo fluxo integrado.
                          </p>
                          <p className="mt-1.5 max-w-[22rem] text-[0.84rem] leading-relaxed text-slate-300/90 sm:mt-2 sm:text-[0.94rem] lg:text-[1.08rem]">
                            App vertical rodando na Smart e conectado ao Posto Agil.
                          </p>
                        </div>
                      </div>

                      <div className="relative z-10 order-1 flex min-h-0 items-center justify-center lg:order-none">
                        <div className="relative flex h-full max-h-[22rem] items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-black/34 px-2 py-2 shadow-[0_24px_60px_rgba(2,6,23,0.36)] sm:max-h-[26rem] sm:rounded-[1.7rem] sm:px-3 sm:py-3 lg:max-h-[32rem] lg:px-4 lg:py-4 xl:max-h-[34rem]">
                          <video
                            ref={activeVideoRef}
                            className="h-full max-h-[21.25rem] w-auto object-contain sm:max-h-[25rem] lg:max-h-[31rem] xl:max-h-[33rem]"
                            autoPlay
                            muted
                            loop={shouldLoopCurrentVideo}
                            data-slide-id={activeSlide.id}
                            playsInline
                            preload="metadata"
                            poster={activeSlide.src}
                            onLoadedMetadata={(event) =>
                              updatePlaybackState(
                                activeSlide.id,
                                0,
                                event.currentTarget.duration
                              )
                            }
                            onEnded={(event) =>
                              handleVideoEnded(event.currentTarget)
                            }
                          >
                            <source src={activeSlide.videoSrc} type="video/mp4" />
                            Seu navegador nao suporta video HTML5.
                          </video>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="relative flex h-full items-center justify-center px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
                      <div className="pointer-events-none absolute inset-x-[10%] top-[16%] h-56 rounded-full bg-cyan-300/12 blur-3xl" />
                      <div className="pointer-events-none absolute inset-x-[14%] bottom-[12%] h-36 rounded-full bg-sky-400/10 blur-3xl" />

                      <video
                        ref={activeVideoRef}
                        className="relative z-10 max-h-[17rem] w-full max-w-[68rem] object-contain sm:max-h-[22rem] md:max-h-[24rem] lg:max-h-[31rem]"
                        autoPlay
                        muted
                        loop={shouldLoopCurrentVideo}
                        data-slide-id={activeSlide.id}
                        playsInline
                        preload="metadata"
                        poster={activeSlide.src}
                        onLoadedMetadata={(event) =>
                          updatePlaybackState(
                            activeSlide.id,
                            0,
                            event.currentTarget.duration
                          )
                        }
                        onEnded={(event) => handleVideoEnded(event.currentTarget)}
                      >
                        <source src={activeSlide.videoSrc} type="video/mp4" />
                        Seu navegador nao suporta video HTML5.
                      </video>
                    </div>
                  )
                ) : (
                  <div className="absolute inset-0 p-4 sm:p-5 lg:p-7">
                    <div className="relative h-full overflow-hidden rounded-[1.8rem] border border-white/10 bg-slate-950/38 shadow-[0_22px_48px_rgba(2,6,23,0.28)]">
                      <Image
                        src={activeSlide.src}
                        alt={activeSlide.alt}
                        fill
                        priority={activeIndex === 0}
                        sizes="100vw"
                        className="hero-media-drift object-contain object-center p-4 sm:p-6 lg:p-8"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
