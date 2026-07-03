"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileDown } from "lucide-react";
import type { Portfolio } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/magnetic";
import { Section } from "./primitives";
import { SocialLinks } from "./social-links";

const ease = [0.16, 1, 0.3, 1] as const;

// Deterministic, sparse particle field (no RNG → no hydration drift).
const PARTICLES = [
  { left: "8%", top: "22%", size: 3, delay: 0 },
  { left: "18%", top: "68%", size: 2, delay: 1.4 },
  { left: "32%", top: "38%", size: 2, delay: 3.1 },
  { left: "47%", top: "78%", size: 3, delay: 0.7 },
  { left: "61%", top: "28%", size: 2, delay: 2.2 },
  { left: "74%", top: "62%", size: 3, delay: 1.1 },
  { left: "86%", top: "34%", size: 2, delay: 3.6 },
  { left: "91%", top: "72%", size: 2, delay: 0.4 },
];

function AnimatedName({ name }: { name: string }) {
  const words = name.split(" ");
  return (
    <h1 className="text-display font-medium tracking-tight">
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.1em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "110%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.15 + i * 0.09 }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}

export function HeroSection({ portfolio }: { portfolio: Portfolio }) {
  const { hero } = portfolio;
  const meta = [hero.role, hero.location].filter(Boolean).join("  ·  ");

  return (
    <Section id="hero">
      {/* Floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {PARTICLES.map((p, i) => (
          <span
            key={i}
            className="animate-float absolute rounded-full bg-white"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              opacity: 0.25,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-4xl">
        {meta && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-6 font-mono text-eyebrow uppercase tracking-[0.22em] text-muted-foreground"
          >
            {meta}
          </motion.p>
        )}

        <AnimatedName name={hero.name} />

        {hero.intro && (
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.45 }}
            className="mt-8 max-w-2xl text-balance text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {hero.intro}
          </motion.p>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.6 }}
          className="mt-10 flex flex-wrap items-center gap-4"
        >
          {hero.links.resume && (
            <Magnetic>
              <a href={hero.links.resume} target="_blank" rel="noreferrer">
                <Button size="lg">
                  <FileDown className="size-4" />
                  Résumé
                </Button>
              </a>
            </Magnetic>
          )}
          <SocialLinks links={hero.links} />
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted-foreground/60"
      >
        <span className="font-mono text-[0.65rem] uppercase tracking-[0.24em]">
          Scroll
        </span>
        <motion.span
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }}
        >
          <ArrowDown className="size-4" />
        </motion.span>
      </motion.div>
    </Section>
  );
}
