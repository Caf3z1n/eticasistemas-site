"use client";

import { Fuel, MessageCircleMore } from "lucide-react";
import { useEffect, useState } from "react";

import type { NavItem, SectionId } from "@/lib/landing-types";
import { cn } from "@/lib/utils";

type HeaderProps = {
  brandName: string;
  navItems: NavItem[];
  ctaLabel: string;
  whatsappLink: string;
};

function normalizeBrandName(brandName: string) {
  const normalized = brandName.trim();

  if (!normalized || /Ã|�/.test(normalized)) {
    return "Ética Sistemas";
  }

  return normalized;
}

export function Header({
  brandName,
  navItems,
  ctaLabel,
  whatsappLink,
}: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<SectionId>(
    navItems[0]?.id ?? "inicio"
  );

  useEffect(() => {
    let ticking = false;

    const updateState = () => {
      setIsScrolled(window.scrollY > 10);

      const marker = window.scrollY + window.innerHeight * 0.34;
      let current = navItems[0]?.id ?? "inicio";

      for (const item of navItems) {
        const section = document.getElementById(item.id);
        if (!section) {
          continue;
        }

        if (section.offsetTop <= marker) {
          current = item.id;
        }
      }

      setActiveSection(current);
      ticking = false;
    };

    const onScrollOrResize = () => {
      if (ticking) {
        return;
      }

      ticking = true;
      window.requestAnimationFrame(updateState);
    };

    updateState();
    window.addEventListener("scroll", onScrollOrResize, { passive: true });
    window.addEventListener("resize", onScrollOrResize);

    return () => {
      window.removeEventListener("scroll", onScrollOrResize);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [navItems]);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const onResize = () => {
      if (window.innerWidth >= 768) {
        setIsMenuOpen(false);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    window.addEventListener("resize", onResize);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("resize", onResize);
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);
  const safeBrandName = normalizeBrandName(brandName);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-transparent transition-all duration-300",
        isScrolled &&
          "border-white/12 bg-slate-950/88 backdrop-blur-xl supports-[backdrop-filter]:bg-slate-950/62"
      )}
    >
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a
          href="#inicio"
          aria-label={safeBrandName}
          onClick={closeMenu}
          className="group inline-flex items-center gap-2 rounded-md px-2 py-1 transition-colors hover:bg-white/5"
        >
          <span className="grid h-8 w-8 place-items-center rounded-md border border-cyan-200/35 bg-gradient-to-br from-cyan-200/30 via-sky-300/12 to-cyan-500/30 text-cyan-100 shadow-[0_6px_20px_-14px_rgba(56,189,248,0.9)]">
            <Fuel className="h-4 w-4" />
          </span>
          <span className="font-display text-base font-semibold tracking-[0.04em] text-white sm:text-lg">
            {safeBrandName}
          </span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          <ul className="flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;

              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "group relative inline-flex h-9 items-center px-0.5 text-[0.8rem] font-semibold uppercase tracking-[0.08em] transition-colors",
                      isActive
                        ? "text-cyan-100"
                        : "text-slate-300 hover:text-white"
                    )}
                  >
                    {item.label}
                    <span
                      className={cn(
                        "pointer-events-none absolute -bottom-0.5 left-0 h-0.5 w-full origin-center rounded-full bg-sky-400 transition-all duration-200",
                        isActive
                          ? "scale-x-100 opacity-100"
                          : "scale-x-0 opacity-0 group-hover:scale-x-100 group-hover:opacity-65"
                      )}
                    />
                  </a>
                </li>
              );
            })}
          </ul>

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-10 items-center gap-2 rounded-md border border-cyan-200/30 bg-cyan-300 px-4 text-sm font-semibold text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-cyan-200"
          >
            <MessageCircleMore className="h-4 w-4" />
            {ctaLabel}
          </a>
        </div>

        <button
          type="button"
          onClick={() => setIsMenuOpen((current) => !current)}
          className="inline-flex h-10 items-center justify-center rounded-md border border-white/20 px-3 text-sm font-semibold text-white transition-colors hover:bg-white/10 md:hidden"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="mobile-navigation"
        >
          {isMenuOpen ? "Fechar" : "Menu"}
        </button>
      </nav>

      <div
        id="mobile-navigation"
        className={cn(
          "md:hidden overflow-hidden border-t border-white/10 bg-slate-950/94 transition-all duration-300",
          isMenuOpen ? "max-h-[80vh] opacity-100" : "max-h-0 opacity-0"
        )}
      >
        <nav className="mx-auto grid w-full max-w-7xl gap-2 px-4 py-4 sm:px-6 lg:px-8">
          {navItems.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                onClick={closeMenu}
                aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "rounded-md border px-3 py-2.5 text-sm font-semibold uppercase tracking-[0.05em] transition-colors",
                    isActive
                      ? "border-cyan-300/40 bg-cyan-300/15 text-cyan-100"
                      : "border-transparent text-slate-200 hover:border-white/15 hover:bg-white/10 hover:text-white"
                  )}
                >
                {item.label}
              </a>
            );
          })}

          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="mt-2 inline-flex items-center justify-center gap-2 rounded-md bg-cyan-300 px-4 py-2.5 text-sm font-semibold text-slate-950"
          >
            <MessageCircleMore className="h-4 w-4" />
            {ctaLabel}
          </a>
        </nav>
      </div>
    </header>
  );
}
