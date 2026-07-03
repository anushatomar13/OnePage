"use client";

import { GraduationCap } from "lucide-react";
import type { Portfolio } from "@/lib/types";
import { SECTION_META } from "@/lib/sections";
import { useAppStore } from "@/lib/store";
import { Editable } from "@/components/editor/editable";
import { Pill, Reveal, Section, SectionHeading } from "./primitives";

export function EducationSection({ portfolio }: { portfolio: Portfolio }) {
  const { education } = portfolio;
  const update = useAppStore((s) => s.updatePortfolio);

  return (
    <Section id="education" center={false}>
      <SectionHeading eyebrow={SECTION_META.education.eyebrow} title="Education" />

      <div className="relative border-l border-border/70 pl-9 sm:pl-12">
        {education.map((e, i) => (
          <Reveal key={e.id} delay={i * 0.08} className="relative mb-8 last:mb-0">
            <span className="absolute top-6 -left-9 flex size-9 -translate-x-1/2 items-center justify-center rounded-full border border-border bg-background text-primary sm:-left-12">
              <GraduationCap className="size-4" />
            </span>

            <div className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong">
              <Editable
                value={e.duration ?? ""}
                placeholder="Dates"
                className="font-mono text-xs uppercase tracking-wider text-primary/80"
                onCommit={(v) => update((p) => void (p.education[i].duration = v))}
              />
              <Editable
                as="h3"
                value={e.institution}
                placeholder="Institution"
                className="mt-2 block text-xl font-medium tracking-tight sm:text-2xl"
                onCommit={(v) => update((p) => void (p.education[i].institution = v))}
              />
              <Editable
                as="p"
                value={e.degree}
                placeholder="Degree"
                className="mt-1 block text-muted-foreground"
                onCommit={(v) => update((p) => void (p.education[i].degree = v))}
              />

              <div className="mt-4 flex flex-wrap items-center gap-2">
                {(e.cgpa || undefined) && (
                  <Pill className="border-primary/30 text-foreground">
                    CGPA&nbsp;
                    <Editable
                      value={e.cgpa ?? ""}
                      onCommit={(v) => update((p) => void (p.education[i].cgpa = v))}
                    />
                  </Pill>
                )}
                {e.location && <Pill>{e.location}</Pill>}
              </div>

              {e.coursework && e.coursework.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {e.coursework.map((c, k) => (
                    <Pill key={k}>
                      <Editable
                        value={c}
                        onCommit={(v) =>
                          update((p) => void (p.education[i].coursework![k] = v))
                        }
                      />
                    </Pill>
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
