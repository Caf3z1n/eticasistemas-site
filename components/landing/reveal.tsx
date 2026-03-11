"use client";

import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  y?: number;
  amount?: number;
};

export function Reveal({
  children,
  className,
  delay = 0,
  duration = 0.65,
  y = 20,
  amount = 0.25,
}: RevealProps) {
  void delay;
  void duration;
  void y;
  void amount;
  return <div className={cn(className)}>{children}</div>;
}

