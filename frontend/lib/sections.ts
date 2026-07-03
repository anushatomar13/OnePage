import type { SectionId } from "@/lib/types";

/** Display metadata per section — used by the nav and section headings. */
export const SECTION_META: Record<SectionId, { label: string; eyebrow: string }> = {
  hero: { label: "Intro", eyebrow: "" },
  education: { label: "Education", eyebrow: "Education" },
  experience: { label: "Experience", eyebrow: "Experience" },
  projects: { label: "Projects", eyebrow: "Selected work" },
  skills: { label: "Skills", eyebrow: "Capabilities" },
  achievements: { label: "Awards", eyebrow: "Recognition" },
  contact: { label: "Contact", eyebrow: "Get in touch" },
  thankyou: { label: "Thanks", eyebrow: "" },
};
