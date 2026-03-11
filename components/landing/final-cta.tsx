import { MessageCircleMore } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { SectionShell } from "@/components/landing/section-shell";
import type { FinalCtaSection } from "@/lib/landing-types";

type FinalCtaProps = {
  cta: FinalCtaSection;
  whatsappLink: string;
};

export function FinalCta({ cta, whatsappLink }: FinalCtaProps) {
  return (
    <SectionShell id="contato" title={cta.title} description={cta.description}>
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border border-white/15 bg-gradient-to-br from-slate-900 via-slate-900 to-primary p-8 text-white sm:p-10">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.2),transparent_55%)]" />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-sm leading-relaxed text-slate-100 sm:text-base">
              Atendimento comercial com foco em diagnóstico da rede e
              demonstração consultiva do Posto Ágil.
            </p>
            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition-transform duration-200 hover:-translate-y-0.5"
            >
              <MessageCircleMore className="h-4 w-4" />
              {cta.buttonLabel}
            </a>
          </div>
        </div>
      </Reveal>
    </SectionShell>
  );
}

