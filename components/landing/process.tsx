import { Reveal } from "@/components/landing/reveal";
import { SectionShell } from "@/components/landing/section-shell";
import type { ProcessSection } from "@/lib/landing-types";

type ProcessProps = {
  process: ProcessSection;
};

export function Process({ process }: ProcessProps) {
  return (
    <SectionShell
      id="processo"
      eyebrow={process.eyebrow}
      title={process.title}
      description={process.description}
      className="bg-transparent"
    >
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {process.steps.map((step, index) => (
          <Reveal key={step.title} delay={index * 0.08}>
            <article className="relative h-full rounded-2xl border border-white/15 bg-slate-950/55 p-6 shadow-[0_12px_35px_rgba(2,6,23,0.45)]">
              <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-cyan-300 text-xs font-semibold text-slate-950">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-4 font-display text-lg text-white">
                {step.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-200/85">
                {step.description}
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </SectionShell>
  );
}

