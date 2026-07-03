/** Trigger a browser download for an in-memory blob/string. */
export function downloadBlob(filename: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  // Revoke on the next tick so the download has started.
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function downloadText(filename: string, text: string, type = "text/plain") {
  downloadBlob(filename, new Blob([text], { type: `${type};charset=utf-8` }));
}

export function downloadJson(filename: string, data: unknown) {
  downloadText(filename, JSON.stringify(data, null, 2), "application/json");
}

/** A filesystem-safe slug derived from a name. */
export function slugify(name: string): string {
  return (
    name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "") || "portfolio"
  );
}
