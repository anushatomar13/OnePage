"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Braces,
  FileCode2,
  Loader2,
  Package,
  Rocket,
  X,
  type LucideIcon,
} from "lucide-react";
import type { Portfolio } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { downloadBlob, downloadJson, downloadText, slugify } from "@/lib/export/download";
import { buildStandaloneHtml } from "@/lib/export/html";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

function Row({
  icon: Icon,
  title,
  desc,
  cta,
  onClick,
  href,
  busy,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  cta: string;
  onClick?: () => void;
  href?: string;
  busy?: boolean;
}) {
  const inner = (
    <>
      <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
        {busy ? <Loader2 className="size-5 animate-spin" /> : <Icon className="size-5" />}
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-medium">{title}</p>
        <p className="text-sm text-muted-foreground">{desc}</p>
      </div>
      <span className="shrink-0 text-sm font-medium text-primary">{cta}</span>
    </>
  );
  const className =
    "flex w-full items-center gap-4 rounded-2xl border border-border bg-white/[0.02] p-4 text-left transition-all hover:-translate-y-0.5 hover:border-border-strong disabled:pointer-events-none disabled:opacity-60";
  return href ? (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {inner}
    </a>
  ) : (
    <button onClick={onClick} disabled={busy} className={className}>
      {inner}
    </button>
  );
}

export function ExportSheet({
  portfolio,
  onClose,
}: {
  portfolio: Portfolio;
  onClose: () => void;
}) {
  const theme = useAppStore((s) => s.theme);
  const [zipping, setZipping] = useState(false);
  const slug = slugify(portfolio.hero.name);

  function exportHtml() {
    downloadText(`${slug}.html`, buildStandaloneHtml(portfolio, theme), "text/html");
  }

  function exportJson() {
    downloadJson(`${slug}.json`, portfolio);
  }

  async function exportNextjs() {
    setZipping(true);
    try {
      const { buildNextjsZip } = await import("@/lib/export/nextjs");
      const blob = await buildNextjsZip(portfolio, theme);
      downloadBlob(`${slug}-nextjs.zip`, blob);
    } finally {
      setZipping(false);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
    >
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden
      />
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 20, scale: 0.98 }}
        transition={{ duration: 0.4, ease }}
        className="glass relative w-full max-w-lg rounded-3xl p-6 sm:p-8"
      >
        <div className="mb-6 flex items-start justify-between">
          <div>
            <h2 className="text-xl font-medium tracking-tight">Export your portfolio</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              Take it anywhere — deploy the HTML, own the source, or keep the data.
            </p>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/[0.06] hover:text-foreground"
          >
            <X className="size-4" />
          </button>
        </div>

        <div className="space-y-3">
          <Row
            icon={FileCode2}
            title="Standalone HTML"
            desc="One self-contained file. Host it anywhere."
            cta="Download"
            onClick={exportHtml}
          />
          <Row
            icon={Package}
            title="Next.js source"
            desc="A clean, editable Next.js 15 project (.zip)."
            cta={zipping ? "Zipping…" : "Download"}
            onClick={exportNextjs}
            busy={zipping}
          />
          <Row
            icon={Braces}
            title="Resume JSON"
            desc="Your structured data, portable and reusable."
            cta="Download"
            onClick={exportJson}
          />
          <Row
            icon={Rocket}
            title="Deploy to Vercel"
            desc="Download the source, then import it to go live."
            cta="Open Vercel ↗"
            href="https://vercel.com/new"
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
