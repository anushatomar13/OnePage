import { create } from "zustand";
import type { Portfolio, SectionId } from "@/lib/types";
import { DEFAULT_THEME, type EditorTheme } from "@/lib/theme";

/** High-level stage of the generate → preview → edit flow. */
export type FlowStage = "idle" | "uploading" | "processing" | "ready" | "error";

interface AppState {
  stage: FlowStage;
  file: File | null;
  portfolio: Portfolio | null;
  editing: boolean;
  error: string | null;

  /** Editor state (live-previewed). */
  theme: EditorTheme;
  hidden: SectionId[];

  setStage: (stage: FlowStage) => void;
  setFile: (file: File | null) => void;
  setPortfolio: (portfolio: Portfolio | null) => void;
  setEditing: (editing: boolean) => void;
  setError: (error: string | null) => void;
  reset: () => void;

  /** Apply a mutation to a deep clone of the portfolio (used by inline editing). */
  updatePortfolio: (mutate: (draft: Portfolio) => void) => void;
  setTheme: (patch: Partial<EditorTheme>) => void;
  toggleSection: (id: SectionId) => void;
  moveSection: (id: SectionId, direction: -1 | 1) => void;
}

const initialState = {
  stage: "idle" as FlowStage,
  file: null,
  portfolio: null,
  editing: false,
  error: null,
  theme: DEFAULT_THEME,
  hidden: [] as SectionId[],
};

export const useAppStore = create<AppState>((set) => ({
  ...initialState,
  setStage: (stage) => set({ stage }),
  setFile: (file) => set({ file }),
  setPortfolio: (portfolio) => set({ portfolio }),
  setEditing: (editing) => set({ editing }),
  setError: (error) => set({ error, stage: error ? "error" : "idle" }),
  reset: () => set(initialState),

  updatePortfolio: (mutate) =>
    set((state) => {
      if (!state.portfolio) return {};
      const draft = structuredClone(state.portfolio);
      mutate(draft);
      return { portfolio: draft };
    }),

  setTheme: (patch) => set((state) => ({ theme: { ...state.theme, ...patch } })),

  toggleSection: (id) =>
    set((state) => ({
      hidden: state.hidden.includes(id)
        ? state.hidden.filter((x) => x !== id)
        : [...state.hidden, id],
    })),

  moveSection: (id, direction) =>
    set((state) => {
      if (!state.portfolio) return {};
      const order = [...state.portfolio.sectionOrder];
      const i = order.indexOf(id);
      const j = i + direction;
      if (i < 0 || j < 0 || j >= order.length) return {};
      [order[i], order[j]] = [order[j], order[i]];
      const draft = structuredClone(state.portfolio);
      draft.sectionOrder = order;
      return { portfolio: draft };
    }),
}));
