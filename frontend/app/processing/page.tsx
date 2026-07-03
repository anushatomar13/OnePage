"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/ambient-background";
import { useAppStore } from "@/lib/store";

/**
 * Placeholder processing screen. Phase 4 replaces this with the full
 * multi-step generation animation wired to the backend.
 */
export default function ProcessingPage() {
  const router = useRouter();
  const file = useAppStore((s) => s.file);

  useEffect(() => {
    if (!file) router.replace("/");
  }, [file, router]);

  return (
    <>
      <AmbientBackground />
      <main className="relative flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1.4, ease: "linear", repeat: Infinity }}
          className="size-10 rounded-full border-2 border-border border-t-primary"
        />
        <p className="mt-8 text-lg font-medium">Generating your portfolio…</p>
        {file && (
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            {file.name}
          </p>
        )}
        <p className="mt-6 max-w-sm text-balance text-sm text-muted-foreground/70">
          The full step-by-step processing experience arrives in Phase 4.
        </p>
      </main>
    </>
  );
}
