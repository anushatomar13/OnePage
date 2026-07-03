/**
 * Shared domain model — the contract between the FastAPI backend
 * (resume parsing + AI extraction) and the Next.js portfolio renderer.
 *
 * Every section is optional-friendly: if a resume lacks a section, the
 * renderer degrades gracefully rather than showing an empty block.
 */

export interface SocialLinks {
  email?: string;
  phone?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  twitter?: string;
  resume?: string;
}

export interface Hero {
  name: string;
  role: string;
  location?: string;
  /** Short, punchy introduction (AI-polished). */
  intro?: string;
  links: SocialLinks;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  /** e.g. "2019 — 2023" */
  duration?: string;
  cgpa?: string;
  location?: string;
  coursework?: string[];
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  duration?: string;
  location?: string;
  /** Concise, impact-first bullets (AI-polished). */
  achievements: string[];
  tech?: string[];
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tech?: string[];
  github?: string;
  demo?: string;
  /** Optional image URL / placeholder key. */
  image?: string;
}

export interface SkillGroup {
  category: string;
  items: string[];
}

export type AchievementKind =
  | "hackathon"
  | "award"
  | "publication"
  | "certificate"
  | "other";

export interface Achievement {
  id: string;
  title: string;
  description?: string;
  kind: AchievementKind;
  date?: string;
  link?: string;
}

/** SEO + design metadata produced by the AI layer. */
export interface PortfolioMeta {
  title?: string;
  description?: string;
  /** Accent hues suggested by the AI (hex or oklch). */
  palette?: string[];
}

export type SectionId =
  | "hero"
  | "education"
  | "experience"
  | "projects"
  | "skills"
  | "achievements"
  | "contact"
  | "thankyou";

/** The full generated portfolio. */
export interface Portfolio {
  hero: Hero;
  education: Education[];
  experience: Experience[];
  projects: Project[];
  skills: SkillGroup[];
  achievements: Achievement[];
  meta: PortfolioMeta;
  /** Render + edit order; hidden sections are removed from this list. */
  sectionOrder: SectionId[];
}
