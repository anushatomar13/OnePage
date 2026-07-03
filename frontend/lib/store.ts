import { create } from "zustand";
import type { Portfolio } from "@/lib/types";

/** High-level stage of the generate → preview → edit flow. */
export type FlowStage = "idle" | "uploading" | "processing" | "ready" | "error";

interface AppState {
  stage: FlowStage;
  /** The uploaded resume file (kept only in-memory during the session). */
  file: File | null;
  /** The generated portfolio, once the backend responds. */
  portfolio: Portfolio | null;
  /** Whether the preview is currently in edit mode. */
  editing: boolean;
  error: string | null;

  setStage: (stage: FlowStage) => void;
  setFile: (file: File | null) => void;
  setPortfolio: (portfolio: Portfolio | null) => void;
  setEditing: (editing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;
}

const initialState = {
  stage: "idle" as FlowStage,
  file: null,
  portfolio: null,
  editing: false,
  error: null,
};

/**
 * Global flow store. Deliberately small — section-level editing state
 * is added in the editor phase.
 */
export const useAppStore = create<AppState>((set) => ({
  ...initialState,
  setStage: (stage) => set({ stage }),
  setFile: (file) => set({ file }),
  setPortfolio: (portfolio) => set({ portfolio }),
  setEditing: (editing) => set({ editing }),
  setError: (error) => set({ error, stage: error ? "error" : "idle" }),
  reset: () => set(initialState),
}));
