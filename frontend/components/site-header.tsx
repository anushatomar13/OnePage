"use client";

import Link from "next/link";
import { motion } from "framer-motion";

/** Slim, minimal top bar. Wordmark left, quiet mono tag right. */
export function SiteHeader() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        <Link
          href="/"
          className="text-lg font-medium tracking-tight text-foreground"
        >
          one<span className="text-gradient font-serif italic">page</span>
        </Link>
        <span className="hidden font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground/70 sm:block">
          Resume → Portfolio
        </span>
      </div>
    </motion.header>
  );
}
