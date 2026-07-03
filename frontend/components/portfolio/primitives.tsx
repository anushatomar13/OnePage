"use client";

import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

/** Fades + slides its children in when scrolled into view (once). */
export function Reveal({
  children,
  delay = 0,
  y = 24,
  className,
}: {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: 0.8, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Full-height, scroll-snapping section wrapper. */
export function Section({
  id,
  children,
  className,
  contentClassName,
  center = true,
}: {
  id: string;
  children: ReactNode;
  className?: string;
  contentClassName?: string;
  center?: boolean;
}) {
  return (
    <section
      id={id}
      data-section={id}
      className={cn(
        "relative flex min-h-dvh w-full snap-start flex-col px-6 py-24 sm:px-10",
        center ? "justify-center" : "justify-start pt-28 sm:pt-32",
        className,
      )}
    >
      <div className={cn("mx-auto w-full max-w-5xl", contentClassName)}>
        {children}
      </div>
    </section>
  );
}

/** Eyebrow + large heading, revealed on scroll. */
export function SectionHeading({
  eyebrow,
  title,
  className,
}: {
  eyebrow: string;
  title: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-14", className)}>
      <Reveal>
        <p className="font-mono text-eyebrow uppercase tracking-[0.22em] text-primary/80">
          {eyebrow}
        </p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2 className="mt-4 text-headline font-medium tracking-tight text-balance">
          {title}
        </h2>
      </Reveal>
    </div>
  );
}

/** Small rounded tag used for coursework, tech stacks, and skills. */
export function Pill({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border bg-white/[0.03] px-3 py-1 text-sm text-muted-foreground transition-colors duration-300 hover:border-border-strong hover:text-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
