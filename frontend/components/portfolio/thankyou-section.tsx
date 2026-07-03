"use client";

import { ArrowUp } from "lucide-react";
import type { Portfolio } from "@/lib/types";
import { Reveal, Section } from "./primitives";

export function ThankYouSection({ portfolio }: { portfolio: Portfolio }) {
  const { hero } = portfolio;
  const year = new Date().getFullYear();

  function toTop() {
    document
      .getElementById("hero")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Section id="thankyou" className="text-center">
      <div className="mx-auto flex max-w-2xl flex-col items-center">
        <Reveal>
          <p className="font-mono text-eyebrow uppercase tracking-[0.22em] text-muted-foreground">
            That&apos;s a wrap
          </p>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-6 text-display font-medium tracking-tight">
            Thank<span className="text-gradient font-serif italic"> you</span>.
          </h2>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-md text-balance text-lg text-muted-foreground">
            Thanks for scrolling all the way through. Let&apos;s make something
            great together.
          </p>
        </Reveal>
        <Reveal delay={0.3}>
          <button
            onClick={toTop}
            className="glass mt-12 inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-foreground"
          >
            <ArrowUp className="size-4" />
            Back to top
          </button>
        </Reveal>
      </div>

      <footer className="absolute inset-x-0 bottom-8 flex flex-col items-center gap-1 px-6 font-mono text-xs text-muted-foreground/60">
        <span className="uppercase tracking-[0.2em]">
          © {year} {hero.name}
        </span>
        <span className="tracking-wide">
          Crafted with{" "}
          <span className="text-foreground/80">one</span>
          <span className="text-gradient font-serif italic">page</span>
        </span>
      </footer>
    </Section>
  );
}
