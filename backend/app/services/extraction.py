"""
Orchestrates raw resume text → finalized Portfolio.

Tries the configured AI provider (rich extraction + enhancement); on any failure
or when no key is configured, falls back to the heuristic parser. Either way the
result is validated, given stable ids, a sensible section order, and SEO defaults.
"""

from __future__ import annotations

import logging

from pydantic import ValidationError

from app.models import Portfolio

from .ai.base import AIError
from .ai.factory import get_provider
from .heuristic import heuristic_portfolio
from .prompts import EXTRACTION_SYSTEM, build_user_prompt

logger = logging.getLogger("onepage.extraction")

DEFAULT_PALETTE = ["#a78bfa", "#60a5fa", "#22d3ee"]

# Sections that always appear (even with sparse data) vs. data-gated ones.
ALWAYS_ON = ["hero", "contact", "thankyou"]
DATA_GATED = ["education", "experience", "projects", "skills", "achievements"]


def generate_portfolio(text: str) -> tuple[Portfolio, str]:
    """Return (portfolio, source) where source is 'openai' | 'gemini' | 'heuristic'."""
    provider = get_provider()
    if provider is not None:
        try:
            data = provider.complete_json(EXTRACTION_SYSTEM, build_user_prompt(text))
            portfolio = Portfolio.model_validate(data)
            _finalize(portfolio)
            return portfolio, provider.name
        except (AIError, ValidationError, KeyError, TypeError) as exc:
            logger.warning("AI extraction failed (%s); using heuristic fallback.", exc)

    portfolio = heuristic_portfolio(text)
    _finalize(portfolio)
    return portfolio, "heuristic"


def _finalize(p: Portfolio) -> None:
    """Assign ids, build the section order, and fill SEO / palette defaults in place."""
    for i, e in enumerate(p.education):
        e.id = e.id or f"edu-{i}"
    for i, x in enumerate(p.experience):
        x.id = x.id or f"exp-{i}"
    for i, pr in enumerate(p.projects):
        pr.id = pr.id or f"proj-{i}"
    for i, a in enumerate(p.achievements):
        a.id = a.id or f"ach-{i}"

    if not p.sectionOrder:
        order = ["hero"]
        counts = {
            "education": len(p.education),
            "experience": len(p.experience),
            "projects": len(p.projects),
            "skills": len(p.skills),
            "achievements": len(p.achievements),
        }
        order += [s for s in DATA_GATED if counts[s] > 0]
        order += ["contact", "thankyou"]
        p.sectionOrder = order  # type: ignore[assignment]

    if not p.hero.role:
        p.hero.role = "Portfolio"
    if not p.meta.title:
        p.meta.title = f"{p.hero.name} — {p.hero.role}".strip(" —")
    if not p.meta.description:
        p.meta.description = (
            p.hero.intro or f"{p.hero.name}, {p.hero.role}. Personal portfolio."
        )[:155]
    if not p.meta.palette:
        p.meta.palette = DEFAULT_PALETTE
