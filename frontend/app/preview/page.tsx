"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AmbientBackground } from "@/components/ambient-background";
import { PortfolioRenderer } from "@/components/portfolio/portfolio-renderer";
import { useAppStore } from "@/lib/store";

export default function PreviewPage() {
  const router = useRouter();
  const portfolio = useAppStore((s) => s.portfolio);

  useEffect(() => {
    if (!portfolio) router.replace("/");
  }, [portfolio, router]);

  if (!portfolio) return null;

  return (
    <>
      <AmbientBackground />
      <PortfolioRenderer portfolio={portfolio} />
    </>
  );
}
