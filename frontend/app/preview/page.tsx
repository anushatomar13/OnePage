"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { AmbientBackground } from "@/components/ambient-background";
import { useAppStore } from "@/lib/store";

/**
 * Placeholder preview. Phase 5 & 6 replace this with the full single-page
 * portfolio renderer (scroll-snap sections). For now it confirms the generated
 * data arrived intact.
 */
export default function PreviewPage() {
  const router = useRouter();
  const portfolio = useAppStore((s) => s.portfolio);

  useEffect(() => {
    if (!portfolio) router.replace("/");
  }, [portfolio, router]);

  if (!portfolio) return null;

  const counts: [string, number][] = [
    ["Experience", portfolio.experience.length],
    ["Projects", portfolio.projects.length],
    ["Education", portfolio.education.length],
    ["Skill groups", portfolio.skills.length],
    ["Achievements", portfolio.achievements.length],
  ];

  return (
    <>
      <AmbientBackground />
      <main className="relative flex min-h-dvh flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="font-mono text-eyebrow uppercase text-muted-foreground"
        >
          Portfolio generated
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="mt-4 text-headline font-medium tracking-tight"
        >
          {portfolio.hero.name}
        </motion.h1>
        {portfolio.hero.role && (
          <p className="mt-3 text-lg text-muted-foreground">{portfolio.hero.role}</p>
        )}

        <div className="glass mt-10 grid grid-cols-2 gap-x-10 gap-y-3 rounded-2xl px-8 py-6 text-left sm:grid-cols-5">
          {counts.map(([label, n]) => (
            <div key={label}>
              <p className="text-2xl font-medium">{n}</p>
              <p className="font-mono text-xs uppercase tracking-wide text-muted-foreground">
                {label}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-8 max-w-sm text-balance text-sm text-muted-foreground/70">
          The full single-page portfolio renderer arrives in Phase 5 & 6.
        </p>
      </main>
    </>
  );
}
