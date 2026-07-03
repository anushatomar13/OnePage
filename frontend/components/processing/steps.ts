import {
  Blocks,
  FileSearch,
  LayoutGrid,
  Palette,
  Rocket,
  Sparkles,
  type LucideIcon,
} from "lucide-react";

export interface ProcessingStep {
  label: string;
  icon: LucideIcon;
}

/** The visible generation narrative. Timed independently of the real API call. */
export const PROCESSING_STEPS: ProcessingStep[] = [
  { label: "Reading your resume", icon: FileSearch },
  { label: "Extracting information", icon: Sparkles },
  { label: "Designing the layout", icon: Palette },
  { label: "Creating components", icon: Blocks },
  { label: "Optimizing every detail", icon: LayoutGrid },
  { label: "Building your portfolio", icon: Rocket },
];
