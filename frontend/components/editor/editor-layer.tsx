"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Pencil } from "lucide-react";
import type { Portfolio } from "@/lib/types";
import { useAppStore } from "@/lib/store";
import { EditorPanel } from "./editor-panel";

/** Editor entry point + panel. Rendered above the portfolio on /preview. */
export function EditorLayer({ portfolio }: { portfolio: Portfolio }) {
  const editing = useAppStore((s) => s.editing);
  const setEditing = useAppStore((s) => s.setEditing);

  return (
    <>
      <AnimatePresence>
        {!editing && (
          <motion.button
            key="customize"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setEditing(true)}
            className="glass fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-foreground shadow-lg transition-all hover:-translate-x-1/2 hover:-translate-y-0.5 hover:border-border-strong"
          >
            <Pencil className="size-4 text-primary" />
            Customize
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {editing && <EditorPanel key="panel" portfolio={portfolio} />}
      </AnimatePresence>
    </>
  );
}
