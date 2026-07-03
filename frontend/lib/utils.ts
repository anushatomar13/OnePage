import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merge Tailwind class names with conflict resolution.
 * Used across all components (and by shadcn/ui primitives).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
