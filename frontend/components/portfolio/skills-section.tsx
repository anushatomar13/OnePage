"use client";

import type { Portfolio } from "@/lib/types";
import { SECTION_META } from "@/lib/sections";
import { Reveal, Section, SectionHeading } from "./primitives";

function SkillPill({ label }: { label: string }) {
  return (
    <span className="cursor-default rounded-full border border-border bg-white/[0.03] px-4 py-1.5 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:scale-105 hover:border-primary/50 hover:bg-primary/10 hover:text-foreground">
      {label}
    </span>
  );
}

export function SkillsSection({ portfolio }: { portfolio: Portfolio }) {
  const { skills } = portfolio;

  return (
    <Section id="skills" center={false}>
      <SectionHeading eyebrow={SECTION_META.skills.eyebrow} title="Skills" />

      <div className="space-y-8">
        {skills.map((group, i) => (
          <Reveal key={group.category} delay={i * 0.06}>
            <div className="grid gap-4 border-t border-border/60 pt-6 sm:grid-cols-[200px_1fr]">
              <p className="pt-1 font-mono text-sm uppercase tracking-wider text-muted-foreground">
                {group.category}
              </p>
              <div className="flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <SkillPill key={item} label={item} />
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
