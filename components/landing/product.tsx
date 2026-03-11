"use client";

import Image from "next/image";
import { Boxes, Fuel, LineChart, Truck } from "lucide-react";
import { useMemo, useState } from "react";
import type { ComponentType } from "react";

import { Reveal } from "@/components/landing/reveal";
import { SectionShell } from "@/components/landing/section-shell";
import type { ProductModule, ProductSection } from "@/lib/landing-types";
import { cn } from "@/lib/utils";

type ProductProps = {
  product: ProductSection;
};

const moduleIconMap: Record<
  ProductModule["icon"],
  ComponentType<{ className?: string }>
> = {
  Truck,
  Boxes,
  Fuel,
  LineChart,
};

export function Product({ product }: ProductProps) {
  const firstModuleId = product.modules[0]?.id ?? "";
  const [activeModuleId, setActiveModuleId] = useState(firstModuleId);

  const activeModule = useMemo(
    () =>
      product.modules.find((module) => module.id === activeModuleId) ??
      product.modules[0],
    [activeModuleId, product.modules]
  );

  if (!activeModule) {
    return null;
  }

  return (
    <SectionShell
      id="produto"
      eyebrow={product.eyebrow}
      title={product.title}
      description={product.description}
      className="bg-transparent"
    >
      <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <Reveal>
          <div
            className="space-y-3"
            role="tablist"
            aria-label="Modulos do Posto Agil"
          >
            {product.modules.map((module) => {
              const Icon = moduleIconMap[module.icon];
              const isActive = module.id === activeModule.id;
              return (
                <button
                  key={module.id}
                  id={`tab-${module.id}`}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-controls={`panel-${module.id}`}
                  onClick={() => setActiveModuleId(module.id)}
                  className={cn(
                    "w-full rounded-2xl border p-4 text-left transition-all",
                    isActive
                      ? "border-cyan-300/40 bg-cyan-300/10 shadow-[0_14px_30px_rgba(8,47,73,0.45)]"
                      : "border-white/15 bg-slate-950/55 hover:border-cyan-300/30"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span
                      className={cn(
                        "inline-flex rounded-lg p-2.5",
                        isActive
                          ? "bg-cyan-300 text-slate-950"
                          : "bg-cyan-300/10 text-cyan-200"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div className="min-w-0">
                      <p className="font-display text-lg text-white">
                        {module.title}
                      </p>
                      <p className="mt-2 text-sm leading-relaxed text-slate-200/85">
                        {module.description}
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <article
            id={`panel-${activeModule.id}`}
            role="tabpanel"
            aria-labelledby={`tab-${activeModule.id}`}
            className="overflow-hidden rounded-2xl border border-white/15 bg-slate-950/55 shadow-[0_16px_40px_rgba(2,6,23,0.45)]"
          >
            <div className="relative aspect-[16/10] border-b border-white/10">
              <Image
                src={activeModule.imageSrc}
                alt={activeModule.imageAlt}
                fill
                sizes="(max-width: 1024px) 100vw, 55vw"
                className="object-cover"
              />
            </div>
            <div className="space-y-4 p-5 sm:p-6">
              <p className="font-display text-xl text-white">{activeModule.title}</p>
              <ul className="space-y-2">
                {activeModule.kpis.map((kpi) => (
                  <li
                    key={kpi}
                    className="rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-100"
                  >
                    {kpi}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        </Reveal>
      </div>
    </SectionShell>
  );
}


