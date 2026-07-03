"""
Pydantic models mirroring the frontend domain model (frontend/lib/types.ts).
Field names are kept camelCase where the TS contract is camelCase so the JSON
serialized by FastAPI drops straight into the Next.js renderer.
"""

from __future__ import annotations

from typing import Literal, Optional

from pydantic import BaseModel, Field

AchievementKind = Literal[
    "hackathon", "award", "publication", "certificate", "other"
]

SectionId = Literal[
    "hero",
    "education",
    "experience",
    "projects",
    "skills",
    "achievements",
    "contact",
    "thankyou",
]


class SocialLinks(BaseModel):
    email: Optional[str] = None
    phone: Optional[str] = None
    linkedin: Optional[str] = None
    github: Optional[str] = None
    website: Optional[str] = None
    twitter: Optional[str] = None
    resume: Optional[str] = None


class Hero(BaseModel):
    name: str
    role: str
    location: Optional[str] = None
    intro: Optional[str] = None
    links: SocialLinks = Field(default_factory=SocialLinks)


class Education(BaseModel):
    id: str = ""
    institution: str
    degree: str
    duration: Optional[str] = None
    cgpa: Optional[str] = None
    location: Optional[str] = None
    coursework: list[str] = Field(default_factory=list)


class Experience(BaseModel):
    id: str = ""
    company: str
    role: str
    duration: Optional[str] = None
    location: Optional[str] = None
    achievements: list[str] = Field(default_factory=list)
    tech: list[str] = Field(default_factory=list)


class Project(BaseModel):
    id: str = ""
    name: str
    description: str
    tech: list[str] = Field(default_factory=list)
    github: Optional[str] = None
    demo: Optional[str] = None
    image: Optional[str] = None


class SkillGroup(BaseModel):
    category: str
    items: list[str] = Field(default_factory=list)


class Achievement(BaseModel):
    id: str = ""
    title: str
    description: Optional[str] = None
    kind: AchievementKind = "other"
    date: Optional[str] = None
    link: Optional[str] = None


class PortfolioMeta(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    palette: list[str] = Field(default_factory=list)


class Portfolio(BaseModel):
    hero: Hero
    education: list[Education] = Field(default_factory=list)
    experience: list[Experience] = Field(default_factory=list)
    projects: list[Project] = Field(default_factory=list)
    skills: list[SkillGroup] = Field(default_factory=list)
    achievements: list[Achievement] = Field(default_factory=list)
    meta: PortfolioMeta = Field(default_factory=PortfolioMeta)
    sectionOrder: list[SectionId] = Field(default_factory=list)


class GenerateResponse(BaseModel):
    """API envelope for POST /api/generate."""

    portfolio: Portfolio
    # Which content pipeline produced this: an AI provider or the fallback.
    source: Literal["openai", "gemini", "heuristic"]
