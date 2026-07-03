"use client";

import { Award, BadgeCheck, BookOpen, Code2, Star } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { AchievementKind, Portfolio } from "@/lib/types";
import { SECTION_META } from "@/lib/sections";
import { ArrowUpRight } from "lucide-react";
import { useAppStore } from "@/lib/store";
import { Editable } from "@/components/editor/editable";
import { cn } from "@/lib/utils";
import { Reveal, Section, SectionHeading } from "./primitives";

const KIND_ICON: Record<AchievementKind, LucideIcon> = {
  hackathon: Code2,
  award: Award,
  publication: BookOpen,
  certificate: BadgeCheck,
  other: Star,
};

const KIND_LABEL: Record<AchievementKind, string> = {
  hackathon: "Hackathon",
  award: "Award",
  publication: "Publication",
  certificate: "Certificate",
  other: "Highlight",
};

export function AchievementsSection({ portfolio }: { portfolio: Portfolio }) {
  const { achievements } = portfolio;
  const update = useAppStore((s) => s.updatePortfolio);

  return (
    <Section id="achievements" center={false}>
      <SectionHeading
        eyebrow={SECTION_META.achievements.eyebrow}
        title="Achievements"
      />

      <div className={cn("grid gap-4", achievements.length > 1 && "sm:grid-cols-2")}>
        {achievements.map((a, i) => {
          const Icon = KIND_ICON[a.kind];
          return (
            <Reveal key={a.id} delay={(i % 2) * 0.08}>
              <div className="glass group flex h-full gap-4 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-border-strong">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/12 text-primary">
                  <Icon className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <Editable
                      as="h3"
                      value={a.title}
                      placeholder="Title"
                      className="font-medium leading-snug"
                      onCommit={(v) =>
                        update((p) => void (p.achievements[i].title = v))
                      }
                    />
                    {a.link && (
                      <a
                        href={a.link}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`${a.title} link`}
                        className="mt-0.5 shrink-0 text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <ArrowUpRight className="size-4" />
                      </a>
                    )}
                  </div>
                  <div className="mt-1.5 flex items-center gap-2">
                    <span className="font-mono text-[0.65rem] uppercase tracking-wider text-primary/70">
                      {KIND_LABEL[a.kind]}
                    </span>
                    {a.date && (
                      <span className="font-mono text-[0.65rem] text-muted-foreground">
                        · {a.date}
                      </span>
                    )}
                  </div>
                  <Editable
                    as="p"
                    multiline
                    value={a.description ?? ""}
                    placeholder="Description (optional)"
                    className="mt-2 text-sm leading-relaxed text-muted-foreground"
                    onCommit={(v) =>
                      update((p) => void (p.achievements[i].description = v))
                    }
                  />
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
