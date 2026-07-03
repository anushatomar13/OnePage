/** Resume upload constraints + validation, shared by the dropzone and API layer. */

export const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10 MB

export const ACCEPTED_TYPES = {
  "application/pdf": [".pdf"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
} as const;

/** `accept` string for the native <input type="file">. */
export const ACCEPT_ATTR = ".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document";

export type ValidationResult =
  | { ok: true }
  | { ok: false; reason: string };

function hasAcceptedExtension(name: string) {
  const lower = name.toLowerCase();
  return lower.endsWith(".pdf") || lower.endsWith(".docx");
}

/**
 * Validate a candidate resume file. We trust the extension as the source of
 * truth (some browsers report empty/incorrect MIME types for .docx).
 */
export function validateResume(file: File): ValidationResult {
  if (!hasAcceptedExtension(file.name)) {
    return { ok: false, reason: "Only PDF and DOCX files are supported." };
  }
  if (file.size > MAX_FILE_SIZE) {
    return { ok: false, reason: "That file is over 10 MB. Try a smaller one." };
  }
  if (file.size === 0) {
    return { ok: false, reason: "That file looks empty." };
  }
  return { ok: true };
}

export function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(0)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
