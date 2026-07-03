"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Download, Pencil } from "lucide-react";
import type { Portfolio } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { EditorPanel } from "./editor-panel";
import { ExportSheet } from "./export-sheet";

/** Editor entry point, export launcher, and their panels. Rendered on /preview. */
export function EditorLayer({ portfolio }: { portfolio: Portfolio }) {
  const editing = useAppStore((s) => s.editing);
  const setEditing = useAppStore((s) => s.setEditing);
  const [showExport, setShowExport] = useState(false);

  return (
    <>
      <AnimatePresence>
        {!editing && (
          <motion.div
            key="toolbar"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2"
          >
            <button
              onClick={() => setEditing(true)}
              className="glass flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:border-border-strong"
            >
              <Pencil className="size-4 text-primary" />
              Customize
            </button>
            <button
              onClick={() => setShowExport(true)}
              className="glass flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-foreground shadow-lg transition-all hover:-translate-y-0.5 hover:border-border-strong"
            >
              <Download className="size-4 text-primary" />
              Export
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editing && <EditorPanel key="panel" portfolio={portfolio} />}
      </AnimatePresence>

      <AnimatePresence>
        {showExport && (
          <ExportSheet
            key="export"
            portfolio={portfolio}
            onClose={() => setShowExport(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
