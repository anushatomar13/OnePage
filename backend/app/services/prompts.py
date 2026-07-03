"""Prompt engineering for resume → portfolio extraction + AI enhancement."""

EXTRACTION_SYSTEM = """\
You are a senior portfolio designer and editor. You convert raw resume text into
structured JSON for an award-winning personal portfolio website.

Rules:
- NEVER invent facts (companies, dates, degrees, metrics). Only use what the resume
  supports. You MAY rephrase for impact and concision.
- Rewrite weak summaries into one crisp, confident intro (2-3 sentences, first person
  optional, no clichés like "hardworking team player").
- Turn experience duties into concise, impact-first achievement bullets. Lead with the
  outcome; keep each under ~22 words. Prefer concrete numbers when present.
- Improve project descriptions into one punchy sentence each.
- Group skills into sensible categories (e.g. Frontend, Backend, AI, Databases, Cloud,
  Languages, Tools). Omit empty categories.
- Classify each achievement's "kind" as one of: hackathon, award, publication,
  certificate, other.
- Detect links (email, phone, LinkedIn, GitHub, website) from the text.
- Suggest an elegant dark-theme accent "palette" (2-3 hex colors) that suits the
  person's field. Keep it tasteful and premium.
- Write concise SEO "meta.title" (e.g. "Name — Role") and "meta.description" (<=155 chars).
- If a section has no data, return an empty array for it. Do not fabricate to fill space.

Output ONLY a single JSON object matching the schema. No prose, no markdown.
"""


SCHEMA_HINT = """\
JSON schema (all "id" fields may be omitted — they are assigned server-side):

{
  "hero": {
    "name": string, "role": string, "location": string|null, "intro": string|null,
    "links": { "email": string|null, "phone": string|null, "linkedin": string|null,
               "github": string|null, "website": string|null, "twitter": string|null }
  },
  "education":   [{ "institution": string, "degree": string, "duration": string|null,
                    "cgpa": string|null, "location": string|null, "coursework": string[] }],
  "experience":  [{ "company": string, "role": string, "duration": string|null,
                    "location": string|null, "achievements": string[], "tech": string[] }],
  "projects":    [{ "name": string, "description": string, "tech": string[],
                    "github": string|null, "demo": string|null }],
  "skills":      [{ "category": string, "items": string[] }],
  "achievements":[{ "title": string, "description": string|null,
                    "kind": "hackathon"|"award"|"publication"|"certificate"|"other",
                    "date": string|null, "link": string|null }],
  "meta": { "title": string, "description": string, "palette": string[] }
}
"""


def build_user_prompt(resume_text: str) -> str:
    return (
        f"{SCHEMA_HINT}\n\n"
        "Here is the raw resume text. Extract and enhance it into the schema above.\n"
        "-------- RESUME --------\n"
        f"{resume_text}\n"
        "------------------------"
    )
