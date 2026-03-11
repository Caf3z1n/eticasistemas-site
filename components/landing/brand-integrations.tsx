import Image from "next/image";
import { Link2 } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { SectionShell } from "@/components/landing/section-shell";
import type { IntegrationsSection } from "@/lib/landing-types";

type BrandIntegrationsProps = {
  integrations: IntegrationsSection;
};

export function BrandIntegrations({ integrations }: BrandIntegrationsProps) {
  return (
    <SectionShell
      id="integracoes"
      eyebrow={integrations.eyebrow}
      title={integrations.title}
      description={integrations.description}
    >
      <div className="space-y-6">
        <Reveal>
          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {integrations.logos.map((logo) => (
              <article
                key={logo.id}
                className="flex items-center justify-center rounded-2xl border border-white/15 bg-slate-950/55 p-5 shadow-[0_14px_36px_rgba(2,6,23,0.45)]"
              >
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  width={160}
                  height={72}
                  className="h-12 w-auto object-contain"
                />
              </article>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="rounded-2xl border border-white/15 bg-slate-950/55 p-6 shadow-[0_14px_36px_rgba(2,6,23,0.45)]">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-cyan-100">
              <Link2 className="h-3.5 w-3.5" />
              Integração de ecossistema
            </div>
            <ul className="space-y-3">
              {integrations.programBadges.map((badge) => (
                <li
                  key={badge}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm leading-relaxed text-slate-100"
                >
                  {badge}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}

