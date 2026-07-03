"use client";

import { GraduationCap } from "lucide-react";
import type { Portfolio } from "@/lib/types";
import { SECTION_META } from "@/lib/sections";
import { Pill, Reveal, Section, SectionHeading } from "./primitives";

export function EducationSection({ portfolio }: { portfolio: Portfolio }) {
  const { education } = portfolio;

  return (
    <Section id="education" center={false}>
      <SectionHeading eyebrow={SECTION_META.education.eyebrow} title="Education" />

      <div className="relative border-l border-border/70 pl-9 sm:pl-12">
        {education.map((e, i) => (
          <Reveal key={e.id} delay={i * 0.08} className="relative mb-8 last:mb-0">
            {/* Timeline node */}
            <span className="absolute top-6 -left-9 flex size-9 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-background text-primary sm:-left-12">
              <GraduationCap className="size-4" />
            </span>

            <div className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong">
              {e.duration && (
                <p className="font-mono text-xs uppercase tracking-wider text-primary/80">
                  {e.duration}
                </p>
              )}
              <h3 className="mt-2 text-xl font-medium tracking-tight sm:text-2xl">
                {e.institution}
              </h3>
              {e.degree && (
                <p className="mt-1 text-muted-foreground">{e.degree}</p>
              )}

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {e.cgpa && (
                  <Pill className="border-primary/30 text-foreground">
                    CGPA&nbsp;{e.cgpa}
                  </Pill>
                )}
                {e.location && <Pill>{e.location}</Pill>}
              </div>

              {e.coursework && e.coursework.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {e.coursework.map((c) => (
                    <Pill key={c}>{c}</Pill>
                  ))}
                </div>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
