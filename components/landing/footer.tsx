import type { BrandInfo, FooterSection } from "@/lib/landing-types";

type FooterProps = {
  brand: BrandInfo;
  footer: FooterSection;
};

export function Footer({ brand, footer }: FooterProps) {
  return (
    <footer className="relative z-10 border-t border-white/10 bg-slate-950/70">
      <div className="mx-auto max-w-6xl px-6 py-10 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-display text-lg text-white">{brand.companyName}</p>
            <p className="mt-3 text-sm leading-relaxed text-slate-200/85">
              {brand.tagline}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
              Produto
            </p>
            <p className="mt-3 text-sm text-slate-100">{brand.productName}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
              Localidade
            </p>
            <p className="mt-3 text-sm text-slate-100">{brand.cityState}</p>
            <p className="mt-2 text-sm text-slate-100">{brand.supportHours}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-300">
              Contato
            </p>
            <p className="mt-3 text-sm text-slate-100">{brand.phoneContact}</p>
            <p className="mt-2 break-all text-sm text-slate-100">
              {brand.emailContact}
            </p>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-6">
          {footer.legalNote ? (
            <p className="text-xs leading-relaxed text-amber-300">
              {footer.legalNote}
            </p>
          ) : null}
          <p className="text-xs text-slate-400">
            Logos de bandeira são usados apenas como referência visual de
            compatibilidade.
          </p>
          <p className="mt-2 text-xs text-slate-400">
            Copyright {new Date().getFullYear()} {brand.companyName}. Todos os
            direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}

