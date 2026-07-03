import { cn } from "@/lib/utils";

/**
 * Ambient page backdrop: slow-drifting aurora glows over an AMOLED base,
 * a faint dot grid, and a film-grain overlay to prevent gradient banding.
 * Purely decorative — rendered behind content, pointer-events disabled.
 */
export function AmbientBackground({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "grain pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background",
        className,
      )}
    >
      {/* Dot grid, fading toward the edges */}
      <div className="bg-dot-grid absolute inset-0 opacity-[0.4] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {/* Aurora glows */}
      <div className="animate-aurora absolute -top-1/3 left-1/2 h-[80vh] w-[80vh] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,var(--grad-1),transparent_60%)] opacity-60 blur-3xl" />
      <div className="animate-aurora absolute top-1/4 -left-1/4 h-[60vh] w-[60vh] rounded-full bg-[radial-gradient(circle,var(--grad-2),transparent_60%)] opacity-40 blur-3xl [animation-delay:-6s]" />
      <div className="animate-aurora absolute -bottom-1/4 right-0 h-[70vh] w-[70vh] rounded-full bg-[radial-gradient(circle,var(--grad-3),transparent_60%)] opacity-30 blur-3xl [animation-delay:-12s]" />

      {/* Vignette to sink content into the black */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--background)_95%)]" />
    </div>
  );
}
