"use client";

import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { AlertTriangle, Check, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";
import { PROCESSING_STEPS } from "./steps";
import { useGenerationFlow } from "./use-generation-flow";

const ease = [0.16, 1, 0.3, 1] as const;

export function ProcessingView() {
  const router = useRouter();
  const reset = useAppStore((s) => s.reset);
  const { completed, total, isError, error, retry } = useGenerationFlow();

  if (isError) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease }}
        className="glass flex w-full max-w-md flex-col items-center rounded-2xl p-8 text-center"
      >
        <div className="flex size-12 items-center justify-center rounded-full bg-destructive/15 text-destructive">
          <AlertTriangle className="size-6" />
        </div>
        <h2 className="mt-5 text-xl font-medium">We hit a snag</h2>
        <p className="mt-2 text-sm text-muted-foreground">{error}</p>
        <div className="mt-7 flex gap-3">
          <Button
            variant="outline"
            onClick={() => {
              reset();
              router.push("/");
            }}
          >
            Back to upload
          </Button>
          <Button onClick={retry}>Try again</Button>
        </div>
      </motion.div>
    );
  }

  const done = completed >= total;
  const currentIndex = Math.min(completed, total - 1);
  const CurrentIcon = PROCESSING_STEPS[currentIndex].icon;
  const heading = done ? "Your portfolio is ready" : PROCESSING_STEPS[currentIndex].label;

  return (
    <div className="flex w-full max-w-md flex-col items-center">
      {/* Rotating gradient ring with the current step's icon */}
      <div className="relative size-24">
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            background:
              "conic-gradient(from 0deg, transparent 0deg, var(--grad-1) 130deg, var(--grad-2) 240deg, var(--grad-3) 330deg, transparent 360deg)",
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 2.6, ease: "linear", repeat: Infinity }}
        />
        <div className="absolute inset-[3px] rounded-full bg-background" />
        <div className="absolute inset-0 grid place-items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={done ? "done" : currentIndex}
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.35, ease }}
            >
              {done ? (
                <Check className="size-8 text-primary" />
              ) : (
                <CurrentIcon className="size-7 text-foreground" />
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Live heading */}
      <div className="mt-8 h-8 text-center">
        <AnimatePresence mode="wait">
          <motion.h1
            key={heading}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.4, ease }}
            className="text-xl font-medium tracking-tight"
          >
            {heading}
          </motion.h1>
        </AnimatePresence>
      </div>

      {/* Progress bar */}
      <div className="mt-4 h-1 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <motion.div
          className="h-full rounded-full bg-[linear-gradient(90deg,var(--grad-1),var(--grad-2),var(--grad-3))]"
          animate={{ width: `${(completed / total) * 100}%` }}
          transition={{ duration: 0.6, ease }}
        />
      </div>

      {/* Step checklist */}
      <ul className="mt-10 w-full space-y-1">
        {PROCESSING_STEPS.map((step, i) => {
          const isDone = i < completed;
          const isActive = i === completed && !done;
          return (
            <motion.li
              key={step.label}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.15 + i * 0.07 }}
              className="flex items-center gap-3.5 py-2"
            >
              <div
                className={cn(
                  "flex size-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-500",
                  isDone && "border-transparent bg-primary/15 text-primary",
                  isActive &&
                    "border-primary/50 text-primary shadow-[0_0_20px_-6px_var(--grad-1)]",
                  !isDone && !isActive && "border-border text-muted-foreground/40",
                )}
              >
                <step.icon className="size-4" />
              </div>
              <span
                className={cn(
                  "flex-1 text-sm transition-colors duration-500",
                  isDone && "text-foreground/60",
                  isActive && "font-medium text-foreground",
                  !isDone && !isActive && "text-muted-foreground/40",
                )}
              >
                {step.label}
              </span>
              <span className="w-5">
                {isDone && <Check className="size-4 text-primary" />}
                {isActive && (
                  <Loader2 className="size-4 animate-spin text-muted-foreground" />
                )}
              </span>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
