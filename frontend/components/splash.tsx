"use client";

import { motion } from "framer-motion";

const ease = [0.16, 1, 0.3, 1] as const;

export function Splash() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center px-6 text-center">
      {/* Eyebrow */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
        className="font-mono text-eyebrow uppercase text-muted-foreground"
      >
        Portfolio Generator
      </motion.p>

      {/* Wordmark */}
      <motion.h1
        initial={{ opacity: 0, y: 24, filter: "blur(12px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 1, ease, delay: 0.08 }}
        className="mt-6 text-display font-medium tracking-tight"
      >
        one<span className="text-gradient font-serif italic">page</span>
      </motion.h1>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.24 }}
        className="mt-8 max-w-xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl"
      >
        Turn your resume into a stunning portfolio in seconds — handcrafted,
        never templated.
      </motion.p>

      {/* Status pill */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease, delay: 0.42 }}
        className="glass mt-12 inline-flex items-center gap-2.5 rounded-full px-4 py-2"
      >
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
        </span>
        <span className="font-mono text-xs tracking-wide text-muted-foreground">
          Foundation ready · upload flow coming next
        </span>
      </motion.div>

      {/* Bottom hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease, delay: 0.8 }}
        className="pointer-events-none absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-[0.7rem] uppercase tracking-[0.24em] text-muted-foreground/60"
      >
        onepage · dark by design
      </motion.div>
    </main>
  );
}
