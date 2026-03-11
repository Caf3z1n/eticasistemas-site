import type { ReactNode } from "react";

import { cn } from "@/lib/utils";
import type { SectionId } from "@/lib/landing-types";

type SectionShellProps = {
  id: SectionId;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
  className?: string;
};

export function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
}: SectionShellProps) {
  return (
    <section
      id={id}
      className={cn("scroll-mt-28 py-20 sm:py-24", className)}
      aria-labelledby={`${id}-title`}
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="mb-10 max-w-3xl sm:mb-12">
          {eyebrow ? (
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-primary/80">
              {eyebrow}
            </p>
          ) : null}
          <h2
            id={`${id}-title`}
            className="font-display text-3xl leading-tight text-foreground sm:text-4xl"
          >
            {title}
          </h2>
          {description ? (
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </div>
    </section>
  );
}


