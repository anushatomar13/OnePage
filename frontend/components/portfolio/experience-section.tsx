"use client";

import { MapPin } from "lucide-react";
import type { Experience, Portfolio } from "@/lib/types";
import { SECTION_META } from "@/lib/sections";
import { Pill, Reveal, Section, SectionHeading } from "./primitives";

function ExperienceCard({ x }: { x: Experience }) {
  return (
    <div className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong sm:p-7">
      <div className="flex items-start gap-4">
        {/* Company logo placeholder */}
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-white/[0.1] to-transparent text-base font-medium">
          {x.company.charAt(0).toUpperCase()}
        </div>
        <div className="min-w-0 flex-1">
          <h3 className="text-lg font-medium tracking-tight sm:text-xl">
            {x.role || x.company}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">
            {x.role ? x.company : null}
            {x.role && x.location ? "  ·  " : ""}
            {x.location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3" />
                {x.location}
              </span>
            )}
          </p>
        </div>
        {x.duration && (
          <p className="shrink-0 pt-1 text-right font-mono text-xs uppercase tracking-wider text-primary/80">
            {x.duration}
          </p>
        )}
      </div>

      {x.achievements.length > 0 && (
        <ul className="mt-5 space-y-2.5">
          {x.achievements.map((a, i) => (
            <li key={i} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-2.5 h-px w-4 shrink-0 bg-primary/60" />
              <span>{a}</span>
            </li>
          ))}
        </ul>
      )}

      {x.tech && x.tech.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {x.tech.map((t) => (
            <Pill key={t}>{t}</Pill>
          ))}
        </div>
      )}
    </div>
  );
}

export function ExperienceSection({ portfolio }: { portfolio: Portfolio }) {
  const { experience } = portfolio;

  return (
    <Section id="experience" center={false}>
      <SectionHeading eyebrow={SECTION_META.experience.eyebrow} title="Experience" />

      <div className="relative border-l border-border/70 pl-9 sm:pl-12">
        {experience.map((x, i) => (
          <Reveal key={x.id} delay={i * 0.08} className="relative mb-8 last:mb-0">
            <span className="absolute top-7 -left-9 flex size-3 -translate-x-1/2 items-center justify-center sm:-left-12">
              <span className="size-3 rounded-full border-2 border-background bg-primary shadow-[0_0_12px_-1px_var(--grad-1)]" />
            </span>
            <ExperienceCard x={x} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
