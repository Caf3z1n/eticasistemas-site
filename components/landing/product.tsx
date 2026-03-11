"use client";

import Image from "next/image";
import {
  Boxes,
  Globe2,
  LineChart,
  Monitor,
  Smartphone,
  Truck,
  Fuel,
} from "lucide-react";
import { useMemo, useState } from "react";
import type { ComponentType } from "react";

import { Reveal } from "@/components/landing/reveal";
import { SectionShell } from "@/components/landing/section-shell";
import type { ProductModule, ProductSection } from "@/lib/landing-types";
import { cn } from "@/lib/utils";

type ProductProps = {
  product: ProductSection;
};

type ProductPresentation = {
  title?: string;
  description?: string;
  imageSrc: string;
  imageAlt: string;
  kpis?: string[];
  imageBadge: string;
  imageNote: string;
  width: number;
  height: number;
  imageMaxWidthClass?: string;
};

type PlatformModuleCard = {
  step: string;
  title: string;
  description: string;
  note: string;
  icon: ComponentType<{ className?: string }>;
  featured?: boolean;
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

const productPresentationMap: Record<string, ProductPresentation> = {
  carga: {
    title: "Simulacoes de carga",
    description:
      "Compare autonomia por empresa, simule reposicao e projete compras com base no consumo da rede.",
    imageSrc: "/images/product/simular_compra.png",
    imageAlt: "Tela real do sistema com simulacoes de carga e projecao de compra",
    kpis: [
      "Comparacao por empresa e combustivel",
      "Projecao de compra para os proximos dias",
      "Leitura visual do risco de reposicao",
    ],
    imageBadge: "Tela real: carga e projecao",
    imageNote: "Simulacao de compra baseada em autonomia e consumo da rede.",
    width: 1252,
    height: 945,
  },
  estoque: {
    title: "Controle de estoque",
    description:
      "Monitore produtos em foco, autonomia, margem e niveis de reposicao para agir antes da ruptura.",
    imageSrc: "/images/product/controle_estoque.png",
    imageAlt: "Tela real do sistema com inteligencia de estoque e recomendacao de compra",
    kpis: [
      "Autonomia e status de reposicao por item",
      "Curva ABC com leitura de margem e giro",
      "Recomendacao de compra para decisao rapida",
    ],
    imageBadge: "Tela real: inteligencia de estoque",
    imageNote:
      "Visao tatica para conveniencia e produtos com monitoramento continuo.",
    width: 1324,
    height: 827,
  },
  abastecimento: {
    title: "Produtos em rede",
    description:
      "Ajuste distribuicao, estoque, custo e venda por empresa em uma unica operacao, com edicao rapida.",
    imageSrc: "/images/product/produtos_rede.png",
    imageAlt: "Tela real do sistema com detalhes do produto e distribuicao rapida na rede",
    kpis: [
      "Distribuicao rapida por empresa da rede",
      "Edicao de estoque, custo e venda no mesmo painel",
      "Atualizacao centralizada de produto",
    ],
    imageBadge: "Tela real: distribuicao na rede",
    imageNote:
      "Gestao unificada de produtos para operacoes com mais de uma empresa.",
    width: 810,
    height: 711,
    imageMaxWidthClass: "max-w-[42rem]",
  },
  inteligencia: {
    title: "Acesso administrativo",
    description:
      "Portal central para a equipe gestora acessar o ambiente administrativo com mais seguranca e controle.",
    imageSrc: "/images/product/login_administrativo.png",
    imageAlt: "Tela real de login do ambiente administrativo do Posto Agil",
    kpis: [
      "Entrada segura para o painel administrativo",
      "Acesso restrito para usuarios autorizados",
      "Ponto unico de entrada para a gestao da plataforma",
    ],
    imageBadge: "Tela real: portal administrativo",
    imageNote: "Ambiente de acesso da operacao administrativa do Posto Agil.",
    width: 683,
    height: 781,
    imageMaxWidthClass: "max-w-[23rem]",
  },
};

const platformModules: PlatformModuleCard[] = [
  {
    step: "Modulo 01",
    title: "Frente de caixa no PC do posto",
    description:
      "Operacao local no PC do posto, inclusive offline, para receber abastecimentos, conferir itens e fechar a venda.",
    note: "Apresentado no hero",
    icon: Monitor,
  },
  {
    step: "Modulo 02",
    title: "Painel web administrativo",
    description:
      "Ambiente central para gerentes, supervisores e donos acompanharem a rede pela web.",
    note: "Centro de gestao da plataforma",
    icon: Globe2,
    featured: true,
  },
  {
    step: "Modulo 03",
    title: "SmartAgil na Maquininha Smart",
    description:
      "Extensao do mesmo fluxo para concluir a venda direto na Maquininha Smart.",
    note: "Apresentado apos modulo 2",
    icon: Smartphone,
  },
] as const;

const managementSignals = [
  "Acesso via navegador",
  "Gerentes, supervisores e donos",
  "Multiempresa e multiunidade",
] as const;

const productDisplayOrder = [
  "inteligencia",
  "abastecimento",
  "carga",
  "estoque",
] as const;

export function Product({ product }: ProductProps) {
  const presentedModules = useMemo(
    () =>
      productDisplayOrder
        .map((moduleId) => product.modules.find((module) => module.id === moduleId))
        .filter((module): module is ProductModule => Boolean(module))
        .map((module) => {
          const presentation = productPresentationMap[module.id];

          if (!presentation) {
            return module;
          }

          return {
            ...module,
            title: presentation.title ?? module.title,
            description: presentation.description ?? module.description,
            imageSrc: presentation.imageSrc,
            imageAlt: presentation.imageAlt,
            kpis: presentation.kpis ?? module.kpis,
          };
        }),
    [product.modules]
  );

  const firstModuleId = presentedModules[0]?.id ?? "";
  const [activeModuleId, setActiveModuleId] = useState(firstModuleId);

  const activeModule = useMemo(
    () =>
      presentedModules.find((module) => module.id === activeModuleId) ??
      presentedModules[0],
    [activeModuleId, presentedModules]
  );

  if (!activeModule) {
    return null;
  }

  return (
    <SectionShell
      id="produto"
      eyebrow={product.eyebrow}
      title="Posto Agil: uma plataforma unica com tres modulos que se complementam."
      description="A frente de caixa roda no PC do posto, o painel web centraliza a gestao da rede e o SmartAgil leva o fechamento para a Maquininha Smart. Tudo faz parte do mesmo fluxo do produto."
      className="bg-transparent"
    >
      <div className="space-y-8">
        <Reveal>
          <div className="grid gap-4 lg:grid-cols-3">
            {platformModules.map((module) => {
              const Icon = module.icon;

              return (
                <article
                  key={module.title}
                  className={cn(
                    "rounded-[1.75rem] border p-5 shadow-[0_18px_40px_rgba(2,6,23,0.32)] transition-colors",
                    module.featured
                      ? "border-cyan-300/35 bg-[linear-gradient(145deg,rgba(14,62,81,0.34),rgba(6,18,32,0.92))]"
                      : "border-white/12 bg-slate-950/55"
                  )}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-cyan-200/80">
                        {module.step}
                      </p>
                      <h3 className="mt-3 font-display text-2xl leading-tight text-white">
                        {module.title}
                      </h3>
                    </div>
                    <span
                      className={cn(
                        "inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl",
                        module.featured
                          ? "bg-cyan-300 text-slate-950"
                          : "bg-cyan-300/10 text-cyan-200"
                      )}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                  </div>

                  <p className="mt-4 text-sm leading-relaxed text-slate-200/86">
                    {module.description}
                  </p>

                  <div className="mt-5 inline-flex rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.14em] text-slate-100/88">
                    {module.note}
                  </div>
                </article>
              );
            })}
          </div>
        </Reveal>

        <div className="overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(150deg,rgba(7,15,28,0.98),rgba(3,10,20,0.92))] p-6 shadow-[0_24px_70px_rgba(2,6,23,0.44)] sm:p-8">
          <Reveal>
            <div className="flex flex-col gap-6 border-b border-white/10 pb-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">
                  Modulo 02
                </div>

                <h3 className="mt-4 font-display text-3xl leading-tight text-white sm:text-[2.4rem]">
                  Painel web administrativo para gerir a rede com visao central.
                </h3>

                <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-200/86 sm:text-lg">
                  Este e o ambiente de gestao do Posto Agil. Gerentes,
                  supervisores e donos acessam pela web para acompanhar
                  simulacoes, controle de estoque, produtos em rede e acessos
                  administrativos no mesmo painel.
                </p>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {managementSignals.map((signal) => (
                  <span
                    key={signal}
                    className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.13em] text-slate-100"
                  >
                    {signal}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
            <Reveal>
              <div
                className="space-y-3"
                role="tablist"
                aria-label="Modulos do painel web administrativo do Posto Agil"
              >
                {presentedModules.map((module) => {
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
                          ? "border-cyan-300/40 bg-cyan-300/10 shadow-[0_14px_30px_rgba(8,47,73,0.4)]"
                          : "border-white/12 bg-slate-950/42 hover:border-cyan-300/25"
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
                          <p className="mt-2 text-sm leading-relaxed text-slate-200/82">
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
                className="overflow-hidden rounded-[1.75rem] border border-white/12 bg-slate-950/55 shadow-[0_18px_44px_rgba(2,6,23,0.4)]"
              >
                <div className="border-b border-white/10 p-4 sm:p-5">
                  <div className="mb-4">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200/80">
                      {productPresentationMap[activeModule.id]?.imageBadge ??
                        "Tela do sistema"}
                    </p>
                    <p className="mt-1 text-sm text-slate-300/78">
                      {productPresentationMap[activeModule.id]?.imageNote ??
                        activeModule.description}
                    </p>
                  </div>

                  <div className="flex min-h-[22rem] items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-[linear-gradient(180deg,rgba(15,23,42,0.88),rgba(3,9,19,0.96))] p-3 sm:min-h-[26rem] sm:p-4">
                    <Image
                      src={activeModule.imageSrc}
                      alt={activeModule.imageAlt}
                      width={
                        productPresentationMap[activeModule.id]?.width ?? 1324
                      }
                      height={
                        productPresentationMap[activeModule.id]?.height ?? 827
                      }
                      sizes="(max-width: 1024px) 100vw, 55vw"
                      className={cn(
                        "h-auto max-h-[32rem] w-full object-contain",
                        productPresentationMap[activeModule.id]
                          ?.imageMaxWidthClass
                      )}
                    />
                  </div>
                </div>

                <div className="space-y-5 p-5 sm:p-6">
                  <div>
                    <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200/80">
                      Dentro do painel web
                    </p>
                    <p className="mt-2 font-display text-2xl text-white">
                      {activeModule.title}
                    </p>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {activeModule.kpis.map((kpi) => (
                      <div
                        key={kpi}
                        className="rounded-xl border border-white/10 bg-white/[0.05] p-3 text-sm leading-relaxed text-slate-100"
                      >
                        {kpi}
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            </Reveal>
          </div>
        </div>
      </div>
    </SectionShell>
  );
}
