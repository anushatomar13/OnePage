"use client";

import { useEffect, useMemo, useRef, useState, type ComponentType } from "react";
import type { Portfolio, SectionId } from "@/lib/types";
import { SECTION_META, sectionHasData } from "@/lib/sections";
import { useAppStore } from "@/lib/store";
import { PortfolioNav } from "./portfolio-nav";
import { HeroSection } from "./hero-section";
import { EducationSection } from "./education-section";
import { ExperienceSection } from "./experience-section";
import { ProjectsSection } from "./projects-section";
import { SkillsSection } from "./skills-section";
import { AchievementsSection } from "./achievements-section";
import { ContactSection } from "./contact-section";
import { ThankYouSection } from "./thankyou-section";

type SectionComponent = ComponentType<{ portfolio: Portfolio }>;

const SECTION_COMPONENTS: Record<SectionId, SectionComponent> = {
  hero: HeroSection,
  education: EducationSection,
  experience: ExperienceSection,
  projects: ProjectsSection,
  skills: SkillsSection,
  achievements: AchievementsSection,
  contact: ContactSection,
  thankyou: ThankYouSection,
};

export function PortfolioRenderer({ portfolio }: { portfolio: Portfolio }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string>("hero");
  const [progress, setProgress] = useState(0);
  const hidden = useAppStore((s) => s.hidden);

  const visible = useMemo(
    () =>
      portfolio.sectionOrder.filter(
        (id) => sectionHasData(id, portfolio) && !hidden.includes(id),
      ),
    [portfolio, hidden],
  );

  // Track the section currently in view.
  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { root, threshold: 0.55 },
    );
    root.querySelectorAll("[data-section]").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [visible]);

  function onScroll(e: React.UIEvent<HTMLDivElement>) {
    const el = e.currentTarget;
    const max = el.scrollHeight - el.clientHeight;
    setProgress(max > 0 ? el.scrollTop / max : 0);
  }

  function jump(id: string) {
    containerRef.current
      ?.querySelector(`#${id}`)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div
      ref={containerRef}
      onScroll={onScroll}
      className="relative h-dvh snap-y snap-proximity overflow-x-hidden overflow-y-auto"
    >
      <PortfolioNav
        sections={visible.map((id) => ({ id, label: SECTION_META[id].label }))}
        activeId={activeId}
        progress={progress}
        onJump={jump}
      />
      {visible.map((id) => {
        const Component = SECTION_COMPONENTS[id];
        return <Component key={id} portfolio={portfolio} />;
      })}
    </div>
  );
}
