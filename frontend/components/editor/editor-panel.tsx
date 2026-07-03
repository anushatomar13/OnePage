"use client";

import { motion } from "framer-motion";
import {
  ChevronDown,
  ChevronUp,
  Eye,
  EyeOff,
  Lock,
  X,
} from "lucide-react";
import type { Portfolio } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { ACCENTS, type HeadingFont } from "@/lib/theme";
import { LOCKED_SECTIONS, SECTION_META, sectionHasData } from "@/lib/sections";
import { cn } from "@/lib/utils";

const FONTS: { id: HeadingFont; label: string; className: string }[] = [
  { id: "sans", label: "Sans", className: "font-sans" },
  { id: "serif", label: "Serif", className: "font-serif italic" },
];

function GroupLabel({ children }: { children: string }) {
  return (
    <p className="mb-3 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-muted-foreground">
      {children}
    </p>
  );
}

export function EditorPanel({ portfolio }: { portfolio: Portfolio }) {
  const theme = useAppStore((s) => s.theme);
  const hidden = useAppStore((s) => s.hidden);
  const setTheme = useAppStore((s) => s.setTheme);
  const toggleSection = useAppStore((s) => s.toggleSection);
  const moveSection = useAppStore((s) => s.moveSection);
  const setEditing = useAppStore((s) => s.setEditing);

  const sections = portfolio.sectionOrder.filter((id) =>
    sectionHasData(id, portfolio),
  );

  return (
    <motion.aside
      initial={{ x: -32, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: -32, opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="glass fixed top-4 bottom-4 left-4 z-50 flex w-72 flex-col rounded-3xl"
    >
      <div className="flex items-center justify-between px-5 pt-5 pb-4">
        <h2 className="text-sm font-medium">Customize</h2>
        <button
          onClick={() => setEditing(false)}
          aria-label="Done editing"
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
        >
          <X className="size-4" />
        </button>
      </div>

      <div className="flex-1 space-y-7 overflow-y-auto px-5 pb-5">
        {/* Accent */}
        <div>
          <GroupLabel>Accent</GroupLabel>
          <div className="flex flex-wrap gap-2.5">
            {ACCENTS.map((a) => (
              <button
                key={a.id}
                onClick={() => setTheme({ accentId: a.id })}
                aria-label={a.label}
                title={a.label}
                className={cn(
                  "size-8 rounded-full transition-transform hover:scale-110",
                  theme.accentId === a.id &&
                    "ring-2 ring-foreground ring-offset-2 ring-offset-background",
                )}
                style={{ background: a.swatch }}
              />
            ))}
          </div>
        </div>

        {/* Heading font */}
        <div>
          <GroupLabel>Heading font</GroupLabel>
          <div className="grid grid-cols-2 gap-2">
            {FONTS.map((f) => (
              <button
                key={f.id}
                onClick={() => setTheme({ font: f.id })}
                className={cn(
                  "rounded-xl border px-3 py-2.5 text-center transition-colors",
                  theme.font === f.id
                    ? "border-primary/60 bg-primary/10 text-foreground"
                    : "border-border text-muted-foreground hover:border-border-strong",
                )}
              >
                <span className={cn("text-lg", f.className)}>Aa</span>
                <span className="mt-0.5 block text-[0.7rem]">{f.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div>
          <GroupLabel>Sections</GroupLabel>
          <ul className="space-y-1">
            {sections.map((id, idx) => {
              const isHidden = hidden.includes(id);
              const locked = LOCKED_SECTIONS.includes(id);
              return (
                <li
                  key={id}
                  className="flex items-center gap-1 rounded-lg px-2 py-1.5 hover:bg-white/[0.03]"
                >
                  <span
                    className={cn(
                      "flex-1 text-sm",
                      isHidden ? "text-muted-foreground/50" : "text-foreground",
                    )}
                  >
                    {SECTION_META[id].label}
                  </span>

                  <button
                    onClick={() => moveSection(id, -1)}
                    disabled={idx === 0}
                    aria-label={`Move ${SECTION_META[id].label} up`}
                    className="flex size-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-25"
                  >
                    <ChevronUp className="size-4" />
                  </button>
                  <button
                    onClick={() => moveSection(id, 1)}
                    disabled={idx === sections.length - 1}
                    aria-label={`Move ${SECTION_META[id].label} down`}
                    className="flex size-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground disabled:pointer-events-none disabled:opacity-25"
                  >
                    <ChevronDown className="size-4" />
                  </button>

                  {locked ? (
                    <span className="flex size-6 items-center justify-center text-muted-foreground/40">
                      <Lock className="size-3.5" />
                    </span>
                  ) : (
                    <button
                      onClick={() => toggleSection(id)}
                      aria-label={isHidden ? "Show section" : "Hide section"}
                      className="flex size-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {isHidden ? (
                        <EyeOff className="size-4" />
                      ) : (
                        <Eye className="size-4" />
                      )}
                    </button>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      </div>

      <p className="border-t border-border px-5 py-4 text-xs leading-relaxed text-muted-foreground">
        Click any text in the page to edit it directly.
      </p>
    </motion.aside>
  );
}
