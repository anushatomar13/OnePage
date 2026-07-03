"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { AmbientBackground } from "@/components/ambient-background";
import { ProcessingView } from "@/components/processing/processing-view";
import { useAppStore } from "@/lib/store";

export default function ProcessingPage() {
  const router = useRouter();
  const file = useAppStore((s) => s.file);

  // Direct navigation without an uploaded file → back to the upload screen.
  useEffect(() => {
    if (!file) router.replace("/");
  }, [file, router]);

  if (!file) return null;

  return (
    <>
      <AmbientBackground />
      <main className="relative flex min-h-dvh flex-col items-center justify-center px-6">
        <ProcessingView />
      </main>
    </>
  );
}
