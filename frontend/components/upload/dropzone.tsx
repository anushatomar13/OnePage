"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, FileText, UploadCloud, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/magnetic";
import { useAppStore } from "@/lib/store";
import { ACCEPT_ATTR, formatBytes, validateResume } from "@/lib/upload";
import { cn } from "@/lib/utils";

const ease = [0.16, 1, 0.3, 1] as const;

export function Dropzone() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const dragDepth = useRef(0);

  const { file, setFile, setStage } = useAppStore();
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function accept(candidate: File | undefined | null) {
    if (!candidate) return;
    const result = validateResume(candidate);
    if (!result.ok) {
      setError(result.reason);
      setFile(null);
      return;
    }
    setError(null);
    setFile(candidate);
  }

  function onDrop(e: React.DragEvent) {
    e.preventDefault();
    dragDepth.current = 0;
    setIsDragging(false);
    accept(e.dataTransfer.files?.[0]);
  }

  function generate() {
    if (!file) return;
    setStage("processing");
    router.push("/processing");
  }

  return (
    <div className="w-full max-w-xl">
      <div
        onDragEnter={(e) => {
          e.preventDefault();
          dragDepth.current += 1;
          setIsDragging(true);
        }}
        onDragOver={(e) => e.preventDefault()}
        onDragLeave={(e) => {
          e.preventDefault();
          dragDepth.current -= 1;
          if (dragDepth.current <= 0) setIsDragging(false);
        }}
        onDrop={onDrop}
        className={cn(
          "group relative overflow-hidden rounded-2xl border border-dashed p-8 text-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-10",
          "glass",
          isDragging
            ? "scale-[1.01] border-primary/70 shadow-[0_0_60px_-15px_var(--grad-1)]"
            : "border-border-strong hover:border-primary/40",
        )}
      >
        {/* Glow that intensifies while dragging */}
        <div
          className={cn(
            "pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--grad-1),transparent_70%)] opacity-0 transition-opacity duration-500",
            isDragging ? "opacity-20" : "group-hover:opacity-[0.08]",
          )}
        />

        <input
          ref={inputRef}
          type="file"
          accept={ACCEPT_ATTR}
          className="sr-only"
          onChange={(e) => accept(e.target.files?.[0])}
        />

        <AnimatePresence mode="wait">
          {file ? (
            <motion.div
              key="selected"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease }}
              className="relative flex flex-col items-center"
            >
              <div className="flex w-full items-center gap-3 rounded-xl border border-border bg-white/[0.02] p-4 text-left">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/15 text-primary">
                  <FileText className="size-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium text-foreground">
                    {file.name}
                  </p>
                  <p className="font-mono text-xs text-muted-foreground">
                    {formatBytes(file.size)} · ready
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setFile(null)}
                  aria-label="Remove file"
                  className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-white/[0.05] hover:text-foreground"
                >
                  <X className="size-4" />
                </button>
              </div>

              <Magnetic className="mt-6">
                <Button variant="default" size="lg" onClick={generate}>
                  Generate portfolio
                  <ArrowUpRight className="size-4" />
                </Button>
              </Magnetic>
            </motion.div>
          ) : (
            <motion.button
              key="idle"
              type="button"
              onClick={() => inputRef.current?.click()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, ease }}
              className="relative flex w-full cursor-pointer flex-col items-center"
            >
              <motion.div
                animate={isDragging ? { y: -4, scale: 1.05 } : { y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease }}
                className="flex size-14 items-center justify-center rounded-2xl border border-border bg-white/[0.03] text-muted-foreground group-hover:text-foreground"
              >
                <UploadCloud className="size-6" />
              </motion.div>
              <p className="mt-5 text-base font-medium text-foreground">
                {isDragging ? "Drop it right here" : "Drag & drop your resume"}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                or{" "}
                <span className="text-foreground underline decoration-border-strong underline-offset-4">
                  browse files
                </span>
              </p>
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      {/* Meta / error line */}
      <div className="mt-4 flex min-h-5 items-center justify-center">
        <AnimatePresence mode="wait">
          {error ? (
            <motion.p
              key="error"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-sm text-destructive"
            >
              {error}
            </motion.p>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground/70"
            >
              PDF or DOCX · max 10 MB
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
