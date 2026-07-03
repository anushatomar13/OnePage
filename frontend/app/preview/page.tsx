"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AmbientBackground } from "@/components/ambient-background";
import { PortfolioRenderer } from "@/components/portfolio/portfolio-renderer";
import { EditorLayer } from "@/components/editor/editor-layer";
import { useAppStore } from "@/lib/store";
import { themeVars } from "@/lib/theme";

export default function PreviewPage() {
  const router = useRouter();
  const portfolio = useAppStore((s) => s.portfolio);
  const theme = useAppStore((s) => s.theme);

  useEffect(() => {
    if (!portfolio) router.replace("/");
  }, [portfolio, router]);

  if (!portfolio) return null;

  return (
    <div style={themeVars(theme)}>
      <AmbientBackground />
      <PortfolioRenderer portfolio={portfolio} />
      <EditorLayer portfolio={portfolio} />
    </div>
  );
}
