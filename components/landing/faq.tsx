"use client";

import { useState } from "react";
import { Minus, Plus } from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { SectionShell } from "@/components/landing/section-shell";
import type { FaqSection } from "@/lib/landing-types";
import { cn } from "@/lib/utils";

type FaqProps = {
  faq: FaqSection;
};

export function Faq({ faq }: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number>(0);

  return (
    <SectionShell
      id="faq"
      eyebrow={faq.eyebrow}
      title={faq.title}
      description={faq.description}
      className="bg-transparent"
    >
      <div className="space-y-3">
        {faq.items.map((item, index) => {
          const isOpen = index === openIndex;
          const panelId = `faq-panel-${index}`;
          const buttonId = `faq-trigger-${index}`;
          return (
            <Reveal key={item.question} delay={index * 0.04}>
              <article className="rounded-2xl border border-white/15 bg-slate-950/55 shadow-[0_10px_35px_rgba(2,6,23,0.45)]">
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                  >
                    <span className="font-medium text-white">
                      {item.question}
                    </span>
                    <span
                      className={cn(
                        "inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/20 text-slate-200 transition-colors",
                        isOpen ? "bg-cyan-300 text-slate-950" : "bg-white/10"
                      )}
                    >
                      {isOpen ? (
                        <Minus className="h-4 w-4" />
                      ) : (
                        <Plus className="h-4 w-4" />
                      )}
                    </span>
                  </button>
                </h3>
                {isOpen ? (
                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    className="border-t border-white/10 px-5 py-4 sm:px-6"
                  >
                    <p className="text-sm leading-relaxed text-slate-200/85">
                      {item.answer}
                    </p>
                  </div>
                ) : null}
              </article>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}

