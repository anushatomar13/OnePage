from __future__ import annotations

from app.config import get_settings

from .base import AIProvider


def get_provider() -> AIProvider | None:
    """Build the configured AI provider, or None to use the heuristic fallback."""
    settings = get_settings()
    resolved = settings.resolved_provider()

    if resolved == "openai" and settings.openai_api_key:
        from .openai_provider import OpenAIProvider

        return OpenAIProvider(settings.openai_api_key, settings.openai_model)

    if resolved == "gemini" and settings.gemini_api_key:
        from .gemini_provider import GeminiProvider

        return GeminiProvider(settings.gemini_api_key, settings.gemini_model)

    return None
