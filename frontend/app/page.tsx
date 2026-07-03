import { AmbientBackground } from "@/components/ambient-background";
import { SiteHeader } from "@/components/site-header";
import { Landing } from "@/components/landing/landing";

export default function Home() {
  return (
    <>
      <AmbientBackground />
      <SiteHeader />
      <Landing />
    </>
  );
}
