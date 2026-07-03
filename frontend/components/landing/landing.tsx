"use client";

import { motion } from "framer-motion";
import { Dropzone } from "@/components/upload/dropzone";

const ease = [0.16, 1, 0.3, 1] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease, delay: 0.1 + i * 0.12 },
  }),
};

export function Landing() {
  return (
    <main className="relative mx-auto flex min-h-dvh max-w-3xl flex-col items-center justify-center px-6 py-28 text-center">
      {/* Eyebrow */}
      <motion.p
        custom={0}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="font-mono text-eyebrow uppercase text-muted-foreground"
      >
        Portfolio Generator
      </motion.p>

      {/* Headline */}
      <motion.h1
        custom={1}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mt-6 text-balance text-headline font-medium"
      >
        Turn your resume into a{" "}
        <span className="text-gradient font-serif italic">stunning portfolio</span>{" "}
        in seconds.
      </motion.h1>

      {/* Subhead */}
      <motion.p
        custom={2}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mt-6 max-w-lg text-balance text-lg leading-relaxed text-muted-foreground"
      >
        No templates. No dragging things around. Upload a PDF or DOCX and get an
        award-winning personal site — handcrafted in moments.
      </motion.p>

      {/* Upload */}
      <motion.div
        custom={3}
        variants={fadeUp}
        initial="hidden"
        animate="show"
        className="mt-12 flex w-full justify-center"
      >
        <Dropzone />
      </motion.div>
    </main>
  );
}
