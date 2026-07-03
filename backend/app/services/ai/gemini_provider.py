from __future__ import annotations

from typing import Any

from .base import AIError, AIProvider


class GeminiProvider(AIProvider):
    name = "gemini"

    def __init__(self, api_key: str, model: str):
        self._api_key = api_key
        self._model = model

    def complete_json(self, system: str, user: str) -> dict[str, Any]:
        try:
            from google import genai
            from google.genai import types
        except ImportError as exc:  # pragma: no cover
            raise AIError("google-genai package is not installed.") from exc

        client = genai.Client(api_key=self._api_key)
        try:
            resp = client.models.generate_content(
                model=self._model,
                contents=user,
                config=types.GenerateContentConfig(
                    system_instruction=system,
                    temperature=0.4,
                    response_mime_type="application/json",
                ),
            )
        except Exception as exc:
            raise AIError(f"Gemini request failed: {exc}") from exc

        return self._loads(resp.text or "")
