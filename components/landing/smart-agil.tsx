"use client";

import Image from "next/image";
import {
  ArrowRight,
  CreditCard,
  Fuel,
  MessageCircleMore,
  ShoppingCart,
} from "lucide-react";

import { Reveal } from "@/components/landing/reveal";
import { SectionShell } from "@/components/landing/section-shell";

type SmartAgilProps = {
  whatsappLink: string;
};

const smartAgilHighlights = [
  {
    title: "Recebe o abastecimento automaticamente",
    description:
      "A venda chega pronta para conferencia na Maquininha Smart, sem digitacao manual.",
    icon: Fuel,
  },
  {
    title: "Inclui conveniencia no mesmo fluxo",
    description:
      "Itens extras entram antes do fechamento sem quebrar a jornada da venda.",
    icon: ShoppingCart,
  },
  {
    title: "Conclui no proprio terminal",
    description:
      "Cartao, PIX e outros meios de pagamento sao finalizados na Smart PagBank.",
    icon: CreditCard,
  },
] as const;

const smartAgilSignals = [
  "Smart PagBank",
  "Cartao + PIX",
  "Menos fila na pista",
] as const;

const smartAgilFlow = [
  "Abastecimento entra",
  "Atendente confere",
  "Venda conclui na smart",
] as const;

export function SmartAgil({ whatsappLink }: SmartAgilProps) {
  return (
    <SectionShell
      id="smartagil"
      eyebrow="Modulo complementar na pista"
      title="SmartAgil: o mesmo Posto Agil na Maquininha Smart para fechar a venda mais rapido."
      description="Quando o atendimento precisa sair do PC e ir para a pista, o SmartAgil assume o fechamento da venda na Maquininha Smart, conectado ao mesmo fluxo da plataforma."
      className="pt-0"
    >
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <Reveal>
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-cyan-100">
              Modulo 03
            </div>

            <div className="space-y-4">
              <h3 className="max-w-xl font-display text-3xl leading-tight text-white sm:text-[2.45rem]">
                Feito para vender com mais agilidade direto na maquininha smart.
              </h3>

              <p className="max-w-xl text-base leading-relaxed text-slate-200/86 sm:text-lg">
                O SmartAgil e a extensao do Posto Agil para a pista. Ele recebe
                o abastecimento, permite conferir a venda e conclui o pagamento
                no proprio terminal, sem retrabalho e sem quebrar o fluxo da
                operacao.
              </p>
            </div>

            <div className="space-y-3 rounded-[1.75rem] border border-white/12 bg-slate-950/55 p-5 shadow-[0_18px_40px_rgba(2,6,23,0.3)]">
              {smartAgilHighlights.map((item) => {
                const Icon = item.icon;

                return (
                  <div
                    key={item.title}
                    className="flex items-start gap-4 border-b border-white/8 pb-4 last:border-b-0 last:pb-0"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-cyan-300/12 text-cyan-200">
                      <Icon className="h-5 w-5" />
                    </span>

                    <div>
                      <p className="font-display text-xl text-white">
                        {item.title}
                      </p>
                      <p className="mt-1.5 text-sm leading-relaxed text-slate-300/82">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200/80">
                Fluxo resumido
              </p>

              <div className="mt-4 flex flex-wrap items-center gap-2.5 text-sm text-slate-100">
                {smartAgilFlow.map((item, index) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <span className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5">
                      {item}
                    </span>
                    {index < smartAgilFlow.length - 1 ? (
                      <ArrowRight className="h-4 w-4 text-cyan-200/60" />
                    ) : null}
                  </div>
                ))}
              </div>
            </div>

            <a
              href={whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-cyan-300 px-5 py-3 text-sm font-semibold text-slate-950 transition-transform duration-200 hover:-translate-y-0.5 hover:bg-cyan-200"
            >
              <MessageCircleMore className="h-4 w-4" />
              Ver demonstracao do fluxo completo
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <div className="overflow-hidden rounded-[2rem] border border-white/12 bg-[linear-gradient(145deg,rgba(7,16,30,0.98),rgba(5,12,24,0.9))] p-5 shadow-[0_24px_70px_rgba(2,6,23,0.42)] sm:p-6">
            <div className="flex flex-wrap gap-2">
              {smartAgilSignals.map((signal) => (
                <span
                  key={signal}
                  className="rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium uppercase tracking-[0.13em] text-slate-100"
                >
                  {signal}
                </span>
              ))}
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-[0.44fr_0.56fr] md:items-end">
              <div className="relative mx-auto w-full max-w-[17rem] md:mx-0 md:max-w-none">
                <div className="absolute inset-0 rounded-full bg-cyan-300/18 blur-3xl" />
                <Image
                  src="/images/product/maquininha_smart.png"
                  alt="Maquininha smart da PagBank usada para operar o app SmartAgil"
                  width={608}
                  height={766}
                  className="relative z-10 w-full drop-shadow-[0_28px_45px_rgba(0,0,0,0.46)]"
                />
              </div>

              <div className="space-y-4">
                <div className="rounded-[1.6rem] border border-white/10 bg-slate-950/82 p-4 shadow-[0_20px_40px_rgba(2,6,23,0.35)]">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-cyan-200/80">
                        App em demonstracao
                      </p>
                      <p className="mt-1 text-sm text-slate-300/78">
                        Rodando na Maquininha Smart e conectado ao Posto Agil.
                      </p>
                    </div>

                    <span className="inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_16px_rgba(74,222,128,0.8)]" />
                  </div>

                  <div className="overflow-hidden rounded-[1.2rem] border border-white/10 bg-black/35">
                    <video
                      className="h-full max-h-[620px] w-full object-contain"
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                    >
                      <source
                        src="/images/product/app-maquininha-pagbank.mp4"
                        type="video/mp4"
                      />
                      Seu navegador nao suporta video HTML5.
                    </video>
                  </div>
                </div>

                <div className="rounded-[1.35rem] border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-relaxed text-slate-100">
                  Mesmo produto. Outro ponto de operacao. O SmartAgil leva o
                  fechamento da venda para a pista sem perder integracao com a
                  frente de caixa e o painel web.
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </SectionShell>
  );
}
