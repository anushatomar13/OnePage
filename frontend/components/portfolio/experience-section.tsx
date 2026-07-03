"use client";

import { MapPin } from "lucide-react";
import type { Experience, Portfolio } from "@/lib/types";
import { SECTION_META } from "@/lib/sections";
import { useAppStore } from "@/lib/store";
import { Editable } from "@/components/editor/editable";
import { Pill, Reveal, Section, SectionHeading } from "./primitives";

function ExperienceCard({ x, i }: { x: Experience; i: number }) {
  const editing = useAppStore((s) => s.editing);
  const update = useAppStore((s) => s.updatePortfolio);

  return (
    <div className="glass group rounded-2xl p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong sm:p-7">
      <div className="flex items-start gap-4">
        <div className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-border bg-gradient-to-br from-white/[0.1] to-transparent text-base font-medium">
          {x.company.charAt(0).toUpperCase() || "•"}
        </div>
        <div className="min-w-0 flex-1">
          <Editable
            as="h3"
            value={x.role || (editing ? "" : x.company)}
            placeholder="Role"
            className="text-lg font-medium tracking-tight sm:text-xl"
            onCommit={(v) => update((p) => void (p.experience[i].role = v))}
          />
          <p className="mt-0.5 flex flex-wrap items-center gap-x-1 text-sm text-muted-foreground">
            <Editable
              value={x.company}
              placeholder="Company"
              onCommit={(v) => update((p) => void (p.experience[i].company = v))}
            />
            {(x.location || editing) && <span aria-hidden>·</span>}
            {(x.location || editing) && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3" />
                <Editable
                  value={x.location ?? ""}
                  placeholder="Location"
                  onCommit={(v) =>
                    update((p) => void (p.experience[i].location = v))
                  }
                />
              </span>
            )}
          </p>
        </div>
        <Editable
          value={x.duration ?? ""}
          placeholder="Dates"
          className="shrink-0 pt-1 text-right font-mono text-xs uppercase tracking-wider text-primary/80"
          onCommit={(v) => update((p) => void (p.experience[i].duration = v))}
        />
      </div>

      {x.achievements.length > 0 && (
        <ul className="mt-5 space-y-2.5">
          {x.achievements.map((a, j) => (
            <li
              key={j}
              className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
            >
              <span className="mt-2.5 h-px w-4 shrink-0 bg-primary/60" />
              <Editable
                as="span"
                multiline
                value={a}
                onCommit={(v) =>
                  update((p) => void (p.experience[i].achievements[j] = v))
                }
              />
            </li>
          ))}
        </ul>
      )}

      {x.tech && x.tech.length > 0 && (
        <div className="mt-5 flex flex-wrap gap-2">
          {x.tech.map((t, k) => (
            <Pill key={k}>
              <Editable
                value={t}
                onCommit={(v) => update((p) => void (p.experience[i].tech![k] = v))}
              />
            </Pill>
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
            <ExperienceCard x={x} i={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
