import {
  ArrowRight,
  Globe2,
  MessageCircleMore,
  Monitor,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";

import { CosmicCarousel } from "@/components/landing/cosmic-carousel";
import { Reveal } from "@/components/landing/reveal";
import type {
  HeroCarouselImageSlide,
  HeroSection as HeroSectionContent,
} from "@/lib/landing-types";

const heroSlides: HeroCarouselImageSlide[] = [
  {
    id: "frente-caixa",
    src: "/images/hero/frente_caixa.png",
    alt: "Tela do sistema com a operacao de frente de caixa",
    caption: "Frente de caixa",
    detail:
      "Abastecimentos chegam prontos para conferencia e fechamento sem retrabalho no caixa.",
    highlight: "Venda agil na pista",
  },
  {
    id: "finalizar-venda",
    src: "/images/hero/finalizar_venda.png",
    alt: "Tela do sistema para finalizacao de venda",
    caption: "Finalizar venda",
    detail:
      "Pagamento e fechamento no mesmo fluxo para reduzir fila e acelerar o atendimento.",
    highlight: "Pagamento no mesmo fluxo",
  },
  {
    id: "caixa-atual",
    src: "/images/hero/caixa_atual.png",
    alt: "Tela do sistema com a visao de caixa atual",
    caption: "Caixa atual",
    detail:
      "Leitura clara da operacao atual para acompanhar valores, status e conferencias da equipe.",
    highlight: "Controle em tempo real",
  },
];

const heroSignals = [
  {
    icon: Monitor,
    eyebrow: "Modulo 01",
    label: "Frente de caixa no PC do posto",
  },
  {
    icon: Globe2,
    eyebrow: "Modulo 02",
    label: "Painel web para a gestao da rede",
  },
  {
    icon: Smartphone,
    eyebrow: "Modulo 03",
    label: "SmartAgil para a Maquininha Smart",
  },
] as const;

const heroHeadline =
  "Frente de caixa do Posto Agil para operar o posto com velocidade, clareza e controle.";

const heroSummary =
  "Este e o modulo de atendimento do Posto Agil: roda no PC do posto, inclusive em operacao offline, e organiza abastecimentos, conferencia e fechamento de venda em uma interface clara. Depois, o mesmo fluxo continua no painel web administrativo e no SmartAgil.";

type HeroProps = {
  hero: HeroSectionContent;
  productName: string;
  whatsappLink: string;
};

export function Hero({ hero, productName, whatsappLink }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative overflow-hidden scroll-mt-28 pb-24 pt-28 sm:pb-28 sm:pt-36"
      aria-labelledby="hero-title"
    >
      <div className="pointer-events-none absolute left-[-12rem] top-14 h-[30rem] w-[30rem] rounded-full bg-cyan-400/10 blur-3xl" />
      <div className="pointer-events-none absolute right-[-10rem] top-24 h-[28rem] w-[28rem] rounded-full bg-blue-500/10 blur-3xl" />
      <div className="pointer-events-none absolute inset-x-0 top-24 hidden h-px bg-[linear-gradient(90deg,transparent,rgba(56,189,248,0.22),transparent)] lg:block" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-14 lg:grid-cols-[0.82fr_1.18fr] lg:items-center">
          <div className="relative z-10 space-y-8">
            <Reveal>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-cyan-200/80">
                {hero.eyebrow}
              </p>
            </Reveal>

            <Reveal delay={0.04}>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-xs font-medium text-cyan-100">
                <ShieldCheck className="h-3.5 w-3.5" />
                {hero.badge}
              </div>
            </Reveal>

            <Reveal delay={0.1}>
              <h1
                id="hero-title"
                className="max-w-4xl font-display text-4xl leading-[0.98] text-white sm:text-5xl lg:text-[4.35rem]"
              >
                {heroHeadline}
              </h1>
            </Reveal>

            <Reveal delay={0.16}>
              <p className="max-w-2xl text-balance text-base leading-relaxed text-slate-200/90 sm:text-lg">
                {heroSummary}
              </p>
            </Reveal>

            <Reveal delay={0.22}>
              <div className="flex flex-wrap gap-3">
                {heroSignals.map((item) => {
                  const Icon = item.icon;

                  return (
                    <div
                      key={item.label}
                      className="min-w-[220px] rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-100"
                    >
                      <div className="flex items-start gap-3">
                        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-300/10 text-cyan-200">
                          <Icon className="h-4 w-4" />
                        </span>
                        <div>
                          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200/78">
                            {item.eyebrow}
                          </p>
                          <p className="mt-1 text-sm leading-snug text-slate-100">
                            {item.label}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </Reveal>

            <Reveal delay={0.28}>
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

            <Reveal delay={0.34}>
              <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/8 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-cyan-100/85">
                <Sparkles className="h-3.5 w-3.5" />
                Modulo 01 apresentado com telas reais e integrado ao restante da plataforma
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.14}>
            <div className="relative lg:-mr-8 xl:-mr-12">
              <div className="pointer-events-none absolute -inset-x-6 top-10 h-[72%] rounded-full bg-cyan-300/12 blur-3xl" />

              <CosmicCarousel slides={heroSlides} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
