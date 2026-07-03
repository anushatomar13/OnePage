"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { generatePortfolio, type GenerateResponse } from "@/lib/api";
import { useAppStore } from "@/lib/store";
import { PROCESSING_STEPS } from "./steps";

const STEP_MS = 950; // cadence for advancing the visible steps
const MIN_TOTAL_MS = 3200; // floor so a fast (heuristic) response never flashes
const TAIL_MS = 650; // let the final check animate before we navigate

const TOTAL = PROCESSING_STEPS.length;
const HOLD = TOTAL - 1; // keep the last step "in progress" until data is ready

export interface GenerationFlow {
  /** Number of completed steps; the step at this index is in progress. */
  completed: number;
  total: number;
  isError: boolean;
  error: string | null;
  retry: () => void;
}

/**
 * Drives the processing screen: fires the generate request once, walks the visible
 * steps forward on a pleasant cadence, and on success stores the portfolio and
 * routes to the preview. The narrative and the network call are decoupled — the
 * last step holds until the request resolves, then everything completes together.
 *
 * We read the result from the `mutateAsync` promise (not the mutation observer)
 * and fire it via a promise-ref, so it survives React Strict Mode's dev
 * mount→unmount→remount and never double-requests.
 */
export function useGenerationFlow(): GenerationFlow {
  const router = useRouter();
  const file = useAppStore((s) => s.file);
  const setPortfolio = useAppStore((s) => s.setPortfolio);
  const setStage = useAppStore((s) => s.setStage);

  const mutation = useMutation({ mutationFn: (f: File) => generatePortfolio(f) });
  const mutateAsyncRef = useRef(mutation.mutateAsync);
  mutateAsyncRef.current = mutation.mutateAsync;

  const [completed, setCompleted] = useState(0);
  const [finishing, setFinishing] = useState(false);
  const [result, setResult] = useState<GenerateResponse | null>(null);
  const [errMsg, setErrMsg] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);

  const startedAt = useRef(0);
  const promiseRef = useRef<Promise<GenerateResponse> | null>(null);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  // Fire the request exactly once; reuse the in-flight promise across remounts.
  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    if (!promiseRef.current) {
      startedAt.current = Date.now();
      promiseRef.current = mutateAsyncRef.current(file);
    }
    promiseRef.current
      .then((res) => {
        if (!cancelled) setResult(res);
      })
      .catch((err: unknown) => {
        if (!cancelled) setErrMsg((err as Error)?.message ?? "Generation failed.");
      });
    return () => {
      cancelled = true;
    };
  }, [file, attempt]);

  // Advance the visible steps while the request is in flight (capped before the last).
  useEffect(() => {
    if (errMsg || finishing || completed >= HOLD) return;
    const t = setTimeout(() => setCompleted((c) => Math.min(c + 1, HOLD)), STEP_MS);
    return () => clearTimeout(t);
  }, [completed, errMsg, finishing]);

  // On result: store the portfolio, complete all steps (respecting the floor), navigate.
  useEffect(() => {
    if (!result || finishing) return;
    setFinishing(true);
    setPortfolio(result.portfolio);

    const wait = Math.max(0, MIN_TOTAL_MS - (Date.now() - startedAt.current));
    const t1 = setTimeout(() => {
      setCompleted(TOTAL);
      setStage("ready");
      const t2 = setTimeout(() => router.push("/preview"), TAIL_MS);
      timers.current.push(t2);
    }, wait);
    timers.current.push(t1);
  }, [result, finishing, router, setPortfolio, setStage]);

  useEffect(() => () => timers.current.forEach(clearTimeout), []);

  const retry = useCallback(() => {
    if (!file) {
      router.push("/");
      return;
    }
    promiseRef.current = null;
    setResult(null);
    setErrMsg(null);
    setCompleted(0);
    setFinishing(false);
    setAttempt((a) => a + 1);
  }, [file, router]);

  return {
    completed,
    total: TOTAL,
    isError: !!errMsg,
    error: errMsg,
    retry,
  };
}
