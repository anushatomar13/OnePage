import type { Portfolio, SectionId } from "@/lib/types";

/** Whether a section has content to render. hero/contact/thankyou always do. */
export function sectionHasData(id: SectionId, p: Portfolio): boolean {
  switch (id) {
    case "education":
      return p.education.length > 0;
    case "experience":
      return p.experience.length > 0;
    case "projects":
      return p.projects.length > 0;
    case "skills":
      return p.skills.length > 0;
    case "achievements":
      return p.achievements.length > 0;
    default:
      return true;
  }
}

/** Sections that must always stay visible. */
export const LOCKED_SECTIONS: SectionId[] = ["hero"];

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
