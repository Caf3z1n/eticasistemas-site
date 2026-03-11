import {
  BarChart3,
  CloudCog,
  Gauge,
  Headset,
  LineChart,
  ShieldCheck,
  WalletCards,
  Workflow,
} from "lucide-react";
import type { ComponentType } from "react";

import { Reveal } from "@/components/landing/reveal";
import { SectionShell } from "@/components/landing/section-shell";
import type { BenefitsSection, FeatureItem } from "@/lib/landing-types";

type BenefitsProps = {
  benefits: BenefitsSection;
};

const benefitIconMap: Record<
  FeatureItem["icon"],
  ComponentType<{ className?: string }>
> = {
  Gauge,
  ShieldCheck,
  WalletCards,
  BarChart3,
  Workflow,
  Headset,
  CloudCog,
  LineChart,
};

export function Benefits({ benefits }: BenefitsProps) {
  return (
    <SectionShell
      id="beneficios"
      eyebrow={benefits.eyebrow}
      title={benefits.title}
      description={benefits.description}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {benefits.items.map((item, index) => {
          const Icon = benefitIconMap[item.icon];
          return (
            <Reveal key={item.title} delay={index * 0.05}>
              <article className="rounded-2xl border border-white/15 bg-slate-950/55 p-6 transition-all duration-300 hover:border-cyan-300/40 hover:shadow-[0_16px_40px_rgba(2,6,23,0.45)]">
                <div className="flex items-start gap-4">
                  <span className="inline-flex rounded-xl bg-cyan-300/12 p-2.5 text-cyan-200">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-lg text-white">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-200/85">
                      {item.description}
                    </p>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}

