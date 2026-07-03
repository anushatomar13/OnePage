import type { CSSProperties } from "react";

/** A curated accent palette. Overrides the design-system CSS variables live. */
export interface Accent {
  id: string;
  label: string;
  /** oklch color for --primary. */
  primary: string;
  /** Three gradient stops for glows / gradient text. */
  grad: [string, string, string];
  /** --ring color (primary with alpha). */
  ring: string;
  /** A representative swatch color for the picker. */
  swatch: string;
}

export const ACCENTS: Accent[] = [
  {
    id: "violet",
    label: "Violet",
    primary: "oklch(0.74 0.15 290)",
    grad: ["#a78bfa", "#60a5fa", "#22d3ee"],
    ring: "oklch(0.74 0.15 290 / 55%)",
    swatch: "#a78bfa",
  },
  {
    id: "sky",
    label: "Sky",
    primary: "oklch(0.72 0.14 235)",
    grad: ["#38bdf8", "#818cf8", "#22d3ee"],
    ring: "oklch(0.72 0.14 235 / 55%)",
    swatch: "#38bdf8",
  },
  {
    id: "emerald",
    label: "Emerald",
    primary: "oklch(0.78 0.15 165)",
    grad: ["#34d399", "#2dd4bf", "#a7f3d0"],
    ring: "oklch(0.78 0.15 165 / 55%)",
    swatch: "#34d399",
  },
  {
    id: "amber",
    label: "Amber",
    primary: "oklch(0.83 0.14 80)",
    grad: ["#fbbf24", "#fb923c", "#fca5a5"],
    ring: "oklch(0.83 0.14 80 / 55%)",
    swatch: "#fbbf24",
  },
  {
    id: "rose",
    label: "Rose",
    primary: "oklch(0.72 0.17 12)",
    grad: ["#fb7185", "#f472b6", "#c084fc"],
    ring: "oklch(0.72 0.17 12 / 55%)",
    swatch: "#fb7185",
  },
  {
    id: "mono",
    label: "Mono",
    primary: "oklch(0.9 0 0)",
    grad: ["#e5e5e5", "#a3a3a3", "#525252"],
    ring: "oklch(0.9 0 0 / 45%)",
    swatch: "#d4d4d4",
  },
];

export type HeadingFont = "sans" | "serif";

export interface EditorTheme {
  accentId: string;
  font: HeadingFont;
}

export const DEFAULT_THEME: EditorTheme = { accentId: "violet", font: "sans" };

export function getAccent(id: string): Accent {
  return ACCENTS.find((a) => a.id === id) ?? ACCENTS[0];
}

/** CSS variables to apply on the portfolio wrapper for the chosen theme. */
export function themeVars(theme: EditorTheme): CSSProperties {
  const a = getAccent(theme.accentId);
  return {
    "--primary": a.primary,
    "--grad-1": a.grad[0],
    "--grad-2": a.grad[1],
    "--grad-3": a.grad[2],
    "--ring": a.ring,
    "--font-display":
      theme.font === "serif"
        ? "var(--font-instrument-serif)"
        : "var(--font-geist-sans)",
  } as CSSProperties;
}
