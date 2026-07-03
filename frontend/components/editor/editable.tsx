"use client";

import type { ElementType } from "react";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

/**
 * Inline-editable text. When the portfolio is in edit mode the element becomes
 * contentEditable and commits its text on blur; otherwise it renders as a plain
 * element (identical output). Empty optional fields collapse when not editing.
 *
 * Uncontrolled while focused (commit-on-blur) so the caret never jumps.
 */
export function Editable({
  value,
  onCommit,
  as,
  className,
  multiline = false,
  placeholder,
}: {
  value: string;
  onCommit: (next: string) => void;
  as?: ElementType;
  className?: string;
  multiline?: boolean;
  placeholder?: string;
}) {
  const editing = useAppStore((s) => s.editing);
  const Tag = (as ?? "span") as ElementType;

  if (!editing) {
    if (!value) return null;
    return <Tag className={className}>{value}</Tag>;
  }

  return (
    <Tag
      className={cn("onepage-editable", className)}
      contentEditable
      suppressContentEditableWarning
      spellCheck={false}
      data-placeholder={placeholder}
      onBlur={(e: React.FocusEvent<HTMLElement>) => {
        const next = (e.currentTarget.textContent ?? "").trim();
        if (next !== value) onCommit(next);
      }}
      onKeyDown={(e: React.KeyboardEvent<HTMLElement>) => {
        if (!multiline && e.key === "Enter") {
          e.preventDefault();
          e.currentTarget.blur();
        }
      }}
    >
      {value}
    </Tag>
  );
}
