"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface NavSection {
  id: string;
  label: string;
}

export function PortfolioNav({
  sections,
  activeId,
  progress,
  onJump,
}: {
  sections: NavSection[];
  activeId: string;
  progress: number;
  onJump: (id: string) => void;
}) {
  return (
    <>
      {/* Top scroll-progress bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] bg-transparent">
        <motion.div
          className="h-full origin-left bg-[linear-gradient(90deg,var(--grad-1),var(--grad-2),var(--grad-3))]"
          style={{ scaleX: progress }}
        />
      </div>

      {/* Right-side dot navigation */}
      <nav
        aria-label="Section navigation"
        className="fixed top-1/2 right-5 z-50 hidden -translate-y-1/2 flex-col items-end gap-4 md:flex"
      >
        {sections.map((s) => {
          const active = s.id === activeId;
          return (
            <button
              key={s.id}
              onClick={() => onJump(s.id)}
              className="group flex items-center gap-3"
              aria-label={`Go to ${s.label}`}
              aria-current={active}
            >
              <span
                className={cn(
                  "font-mono text-[0.65rem] uppercase tracking-[0.2em] opacity-0 transition-all duration-300 group-hover:opacity-100",
                  active ? "text-foreground opacity-100" : "text-muted-foreground",
                )}
              >
                {s.label}
              </span>
              <span
                className={cn(
                  "block rounded-full transition-all duration-300",
                  active
                    ? "size-2.5 bg-primary shadow-[0_0_10px_-1px_var(--grad-1)]"
                    : "size-1.5 bg-muted-foreground/40 group-hover:bg-muted-foreground",
                )}
              />
            </button>
          );
        })}
      </nav>
    </>
  );
}
