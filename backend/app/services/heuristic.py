"""
No-AI fallback: best-effort structuring of raw resume text into a Portfolio.
Deliberately conservative — it never invents content, and the renderer degrades
gracefully for whatever it cannot find. Real quality comes from the AI providers.
"""

from __future__ import annotations

import re

from app.models import (
    Achievement,
    Education,
    Experience,
    Hero,
    Portfolio,
    PortfolioMeta,
    Project,
    SkillGroup,
    SocialLinks,
)

EMAIL_RE = re.compile(r"[\w.+-]+@[\w-]+\.[\w.-]+")
PHONE_RE = re.compile(r"(\+?\d[\d\s().-]{8,}\d)")
URL_RE = re.compile(r"(?:https?://)?(?:www\.)?[\w-]+\.[\w./%#?=&-]+", re.I)
YEAR_RANGE_RE = re.compile(
    r"(?:19|20)\d{2}\s*[-–—]+\s*(?:present|current|(?:19|20)\d{2})", re.I
)
GPA_RE = re.compile(r"(?:cgpa|gpa)[:\s]*([0-9]\.\d{1,2}(?:\s*/\s*(?:10|4))?)", re.I)

ROLE_HINTS = (
    "engineer developer designer manager scientist analyst student intern "
    "consultant architect lead founder researcher specialist administrator"
).split()

HEADERS: dict[str, list[str]] = {
    "summary": ["summary", "about", "profile", "objective"],
    "education": ["education", "academics"],
    "experience": [
        "experience",
        "work experience",
        "employment",
        "professional experience",
        "work history",
    ],
    "projects": ["projects", "personal projects", "selected projects"],
    "skills": ["skills", "technical skills", "tech stack", "technologies"],
    "achievements": [
        "achievements",
        "awards",
        "honors",
        "honours",
        "certifications",
        "certificates",
        "publications",
        "accomplishments",
    ],
}


def _norm_header(line: str) -> str:
    return re.sub(r"[^a-z ]", "", line.lower()).strip()


def _match_section(line: str) -> str | None:
    if len(line.split()) > 4:
        return None
    norm = _norm_header(line)
    for section, aliases in HEADERS.items():
        if norm in aliases:
            return section
    return None


def _split_sections(lines: list[str]) -> tuple[list[str], dict[str, list[str]]]:
    """Split lines into a leading header block and per-section line buckets."""
    header_lines: list[str] = []
    sections: dict[str, list[str]] = {}
    current: str | None = None
    for ln in lines:
        section = _match_section(ln)
        if section:
            current = section
            sections.setdefault(current, [])
            continue
        if current is None:
            header_lines.append(ln)
        else:
            sections[current].append(ln)
    return header_lines, sections


def _blocks(lines: list[str]) -> list[list[str]]:
    """Group consecutive non-blank lines into blocks split on blank lines."""
    blocks: list[list[str]] = []
    cur: list[str] = []
    for ln in lines:
        if ln.strip():
            cur.append(ln.strip())
        elif cur:
            blocks.append(cur)
            cur = []
    if cur:
        blocks.append(cur)
    return blocks


def _segment_entries(lines: list[str]) -> list[list[str]]:
    """
    Segment timeline-style sections (experience, education) into entries.

    Works even when blank lines don't survive PDF extraction: a new entry begins
    at a non-bullet header line once the current entry already contains a
    date/year range (each role/degree carries exactly one).
    """
    entries: list[list[str]] = []
    cur: list[str] = []
    has_year = False
    for raw in lines:
        ln = raw.strip()
        if not ln:
            continue
        is_bullet = ln.startswith("-")
        is_year = bool(YEAR_RANGE_RE.search(ln))
        is_gpa = bool(GPA_RE.search(ln))
        # A GPA line trails an education entry — never treat it as a new header.
        if cur and has_year and not is_bullet and not is_year and not is_gpa:
            entries.append(cur)
            cur = []
            has_year = False
        cur.append(ln)
        if is_year:
            has_year = True
    if cur:
        entries.append(cur)
    return entries


def _links(text: str) -> SocialLinks:
    links = SocialLinks()
    if m := EMAIL_RE.search(text):
        links.email = m.group(0)
    if m := PHONE_RE.search(text):
        links.phone = m.group(0).strip()
    for url in URL_RE.findall(text):
        low = url.lower()
        if "linkedin" in low and not links.linkedin:
            links.linkedin = _https(url)
        elif "github" in low and not links.github:
            links.github = _https(url)
        elif "@" not in url and "." in url and not links.website:
            if not any(k in low for k in ("linkedin", "github")):
                links.website = _https(url)
    return links


def _https(url: str) -> str:
    return url if url.startswith("http") else f"https://{url}"


def _guess_name(header_lines: list[str]) -> str:
    for ln in header_lines[:4]:
        if EMAIL_RE.search(ln) or PHONE_RE.search(ln):
            continue
        words = ln.split()
        if 1 < len(words) <= 5 and all(w[:1].isalpha() for w in words):
            return ln
    return header_lines[0] if header_lines else "Your Name"


def _guess_role(header_lines: list[str], name: str) -> str:
    for ln in header_lines[:6]:
        if ln == name or EMAIL_RE.search(ln) or PHONE_RE.search(ln):
            continue
        if any(h in ln.lower() for h in ROLE_HINTS) and len(ln) < 70:
            return ln
    return ""


def _classify(title: str) -> str:
    low = title.lower()
    if "hackathon" in low:
        return "hackathon"
    if any(k in low for k in ("publication", "publish", "paper", "journal")):
        return "publication"
    if any(k in low for k in ("certificate", "certification", "certified")):
        return "certificate"
    if any(k in low for k in ("award", "winner", "prize", "honor", "honour", "rank")):
        return "award"
    return "other"


def _education(lines: list[str]) -> list[Education]:
    out: list[Education] = []
    for block in _segment_entries(lines):
        joined = " ".join(block)
        institution = block[0]
        # Degree: first following line that isn't the year range or the GPA line.
        degree = ""
        for ln in block[1:]:
            if YEAR_RANGE_RE.search(ln) or GPA_RE.search(ln):
                continue
            degree = ln
            break
        duration = m.group(0) if (m := YEAR_RANGE_RE.search(joined)) else None
        cgpa = m.group(1) if (m := GPA_RE.search(joined)) else None
        out.append(
            Education(
                institution=institution, degree=degree, duration=duration, cgpa=cgpa
            )
        )
    return out


def _experience(lines: list[str]) -> list[Experience]:
    out: list[Experience] = []
    for block in _segment_entries(lines):
        company = block[0]
        duration: str | None = None
        role = ""
        achievements: list[str] = []
        for ln in block[1:]:
            if m := YEAR_RANGE_RE.search(ln):
                duration = duration or m.group(0)
                leftover = YEAR_RANGE_RE.sub("", ln).strip(" -–—|,·")
                if leftover and not role and not ln.startswith("-"):
                    role = leftover
                continue
            if ln.startswith("-"):
                achievements.append(ln.lstrip("- ").strip())
            elif not role:
                role = ln
            else:
                achievements.append(ln)
        out.append(
            Experience(
                company=company,
                role=role,
                duration=duration,
                achievements=achievements,
            )
        )
    return out


def _projects(lines: list[str]) -> list[Project]:
    out: list[Project] = []
    for block in _blocks(lines):
        joined = " ".join(block[1:]) if len(block) > 1 else block[0]
        github = None
        demo = None
        for url in URL_RE.findall(" ".join(block)):
            if "github" in url.lower():
                github = _https(url)
            elif "@" not in url:
                demo = _https(url)
        out.append(
            Project(
                name=block[0],
                description=joined,
                github=github,
                demo=demo,
            )
        )
    return out


def _skills(lines: list[str]) -> list[SkillGroup]:
    groups: list[SkillGroup] = []
    loose: list[str] = []
    for ln in lines:
        if not ln.strip():
            continue
        if ":" in ln:
            cat, rest = ln.split(":", 1)
            items = [s.strip() for s in re.split(r"[,|/•]", rest) if s.strip()]
            if items:
                groups.append(SkillGroup(category=cat.strip(), items=items))
                continue
        loose.extend(s.strip() for s in re.split(r"[,|/•]", ln) if s.strip())
    if loose:
        groups.append(SkillGroup(category="Skills", items=loose))
    return groups


def _achievements(lines: list[str]) -> list[Achievement]:
    """Achievements are typically one per line — treat each line as an entry."""
    out: list[Achievement] = []
    for ln in lines:
        title = ln.lstrip("- ").strip()
        if not title:
            continue
        out.append(Achievement(title=title, kind=_classify(title)))  # type: ignore[arg-type]
    return out


def heuristic_portfolio(text: str) -> Portfolio:
    lines = text.split("\n")
    header_lines, sections = _split_sections(lines)
    header_block = [ln for ln in header_lines if ln.strip()]

    name = _guess_name(header_block)
    role = _guess_role(header_block, name)
    links = _links(text)

    intro = None
    if summary := sections.get("summary"):
        intro = " ".join(ln for ln in summary if ln.strip()) or None

    return Portfolio(
        hero=Hero(name=name, role=role, intro=intro, links=links),
        education=_education(sections.get("education", [])),
        experience=_experience(sections.get("experience", [])),
        projects=_projects(sections.get("projects", [])),
        skills=_skills(sections.get("skills", [])),
        achievements=_achievements(sections.get("achievements", [])),
        meta=PortfolioMeta(),
    )
