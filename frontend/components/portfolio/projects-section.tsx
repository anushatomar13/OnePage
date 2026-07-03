"use client";

import { ArrowUpRight } from "lucide-react";
import type { Portfolio, Project } from "@/lib/types";
import { SECTION_META } from "@/lib/sections";
import { useAppStore } from "@/lib/store";
import { Editable } from "@/components/editor/editable";
import { cn } from "@/lib/utils";
import { GithubIcon } from "./brand-icons";
import { Pill, Reveal, Section, SectionHeading } from "./primitives";

function ProjectCard({ p, i }: { p: Project; i: number }) {
  const update = useAppStore((s) => s.updatePortfolio);
  return (
    <div className="glass group flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-border-strong">
      {/* Stylized image placeholder (resumes rarely ship project imagery) */}
      <div className="relative aspect-[16/10] overflow-hidden border-b border-border">
        <div className="bg-dot-grid absolute inset-0 opacity-40" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,var(--grad-1),transparent_55%),radial-gradient(circle_at_80%_90%,var(--grad-3),transparent_55%)] opacity-25 transition-transform duration-500 group-hover:scale-110" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="font-serif text-7xl italic text-white/15 transition-transform duration-500 group-hover:scale-110">
            {p.name.charAt(0).toUpperCase()}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-start justify-between gap-3">
          <Editable
            as="h3"
            value={p.name}
            placeholder="Project name"
            className="text-lg font-medium tracking-tight"
            onCommit={(v) => update((d) => void (d.projects[i].name = v))}
          />
          <div className="flex shrink-0 items-center gap-1.5">
            {p.github && (
              <a
                href={p.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.name} on GitHub`}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
              >
                <GithubIcon className="size-4" />
              </a>
            )}
            {p.demo && (
              <a
                href={p.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${p.name} live demo`}
                className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
              >
                <ArrowUpRight className="size-4" />
              </a>
            )}
          </div>
        </div>

        <Editable
          as="p"
          multiline
          value={p.description}
          placeholder="A short description…"
          className="mt-2 text-sm leading-relaxed text-muted-foreground"
          onCommit={(v) => update((d) => void (d.projects[i].description = v))}
        />

        {p.tech && p.tech.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-2 pt-4">
            {p.tech.map((t, k) => (
              <Pill key={k} className="text-xs">
                <Editable
                  value={t}
                  onCommit={(v) => update((d) => void (d.projects[i].tech![k] = v))}
                />
              </Pill>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function ProjectsSection({ portfolio }: { portfolio: Portfolio }) {
  const { projects } = portfolio;

  return (
    <Section id="projects" center={false}>
      <SectionHeading eyebrow={SECTION_META.projects.eyebrow} title="Projects" />

      <div className={cn("grid gap-6", projects.length > 1 && "sm:grid-cols-2")}>
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 0.1}>
            <ProjectCard p={p} i={i} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
