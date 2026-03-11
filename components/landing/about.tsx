import {
  Building2,
  CalendarClock,
  CheckCircle2,
  Headset,
  Layers3,
  ShieldCheck,
  Users,
} from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { SectionShell } from "@/components/landing/section-shell";
import type { AboutSection } from "@/lib/landing-types";

type AboutProps = {
  about: AboutSection;
};

const statIcons = [CalendarClock, Building2, Headset];

export function About({ about }: AboutProps) {
  return (
    <SectionShell
      id="sobre"
      eyebrow={about.eyebrow}
      title={about.title}
      description={about.description}
    >
      <div className="space-y-8">
        <Reveal>
          <article className="rounded-3xl border border-white/15 bg-slate-950/70 p-6 shadow-[0_12px_36px_rgba(2,6,23,0.45)] sm:p-8">
            <h3 className="font-display text-2xl text-white">
              Atuação orientada à realidade da rede
            </h3>
            <div className="mt-4 space-y-4">
              {about.narrative.map((paragraph) => (
                <p
                  key={paragraph}
                  className="text-base leading-relaxed text-slate-200/90"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </article>
        </Reveal>

        <Reveal>
          <article className="rounded-3xl border border-white/15 bg-slate-950/70 p-6 shadow-[0_12px_36px_rgba(2,6,23,0.45)] sm:p-8">
            <h3 className="font-display text-xl text-white sm:text-2xl">
              Indicadores da empresa
            </h3>
            <p className="mt-2 text-sm text-slate-200/85">
              Estrutura, experiência e atendimento para sustentar redes com
              operação intensa.
            </p>

            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {about.stats.map((stat, index) => {
                const Icon = statIcons[index % statIcons.length];
                return (
                  <article
                    key={stat.label}
                    className="flex h-full flex-col rounded-2xl border border-white/15 bg-slate-900/70 p-4"
                  >
                    <span className="inline-flex w-fit rounded-lg border border-cyan-300/30 bg-cyan-300/10 p-2 text-cyan-200">
                      <Icon className="h-4 w-4" />
                    </span>
                    <p className="mt-3 text-[11px] uppercase tracking-[0.14em] text-slate-300">
                      {stat.label}
                    </p>
                    <p className="mt-2 min-h-[2.8rem] text-xl font-semibold leading-tight text-white sm:text-2xl">
                      {stat.value}
                    </p>
                    {stat.note ? (
                      <p className="mt-3 text-sm leading-relaxed text-slate-300">
                        {stat.note}
                      </p>
                    ) : null}
                  </article>
                );
              })}
            </div>
          </article>
        </Reveal>

        <div className="grid gap-4 sm:grid-cols-2">
          {about.pillars.map((pillar, index) => {
            const icons = [Layers3, Users, ShieldCheck, CheckCircle2];
            const Icon = icons[index % icons.length];
            return (
              <Reveal key={pillar.title}>
                <article className="rounded-2xl border border-white/15 bg-slate-950/70 p-5 shadow-[0_10px_28px_rgba(2,6,23,0.4)]">
                  <div className="mb-3 inline-flex rounded-lg border border-cyan-300/25 bg-cyan-300/10 p-2 text-cyan-200">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-display text-lg text-white">{pillar.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-200/85">
                    {pillar.description}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal>
          <ul className="grid gap-3 rounded-2xl border border-white/15 bg-slate-950/70 p-5 shadow-[0_10px_28px_rgba(2,6,23,0.4)] sm:grid-cols-2">
            {about.commitments.map((item) => (
              <li key={item} className="flex items-start gap-3">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />
                <p className="text-sm leading-relaxed text-slate-200/90">
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </SectionShell>
  );
}

