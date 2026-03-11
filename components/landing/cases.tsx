import { Quote, Star } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { SectionShell } from "@/components/landing/section-shell";
import type { CasesSection } from "@/lib/landing-types";

type CasesProps = {
  casesSection: CasesSection;
};

export function Cases({ casesSection }: CasesProps) {
  return (
    <SectionShell
      id="cases"
      eyebrow={casesSection.eyebrow}
      title={casesSection.title}
      description={casesSection.description}
    >
      <div className="grid gap-4 md:grid-cols-2">
        {casesSection.items.map((item, index) => (
          <Reveal key={item.name} delay={index * 0.06}>
            <article className="group relative h-full overflow-hidden rounded-2xl border border-white/15 bg-slate-950/55 p-6 shadow-[0_16px_40px_rgba(2,6,23,0.45)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-300/35">
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-0 bg-[radial-gradient(80%_80%_at_50%_0%,rgba(56,189,248,0.18),transparent_70%)]" />
              </div>
              <div className="relative space-y-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/10 px-3 py-1 text-xs font-medium text-cyan-100">
                    <Star className="h-3.5 w-3.5" />
                    {item.network}
                  </span>
                  <Quote className="h-4 w-4 text-slate-300" />
                </div>

                <h3 className="font-display text-xl text-white">{item.name}</h3>
                <p className="text-xs uppercase tracking-[0.16em] text-slate-300">
                  {item.role}
                </p>
                <p className="text-base leading-relaxed text-slate-100/95">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <p className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200/90">
                  <strong className="font-semibold text-white">Impacto:</strong>{" "}
                  {item.impact}
                </p>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

