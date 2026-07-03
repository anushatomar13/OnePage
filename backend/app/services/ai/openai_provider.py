from __future__ import annotations

from typing import Any

from .base import AIError, AIProvider


class OpenAIProvider(AIProvider):
    name = "openai"

    def __init__(self, api_key: str, model: str):
        self._api_key = api_key
        self._model = model

    def complete_json(self, system: str, user: str) -> dict[str, Any]:
        try:
            from openai import OpenAI
        except ImportError as exc:  # pragma: no cover
            raise AIError("openai package is not installed.") from exc

        client = OpenAI(api_key=self._api_key)
        try:
            resp = client.chat.completions.create(
                model=self._model,
                temperature=0.4,
                response_format={"type": "json_object"},
                messages=[
                    {"role": "system", "content": system},
                    {"role": "user", "content": user},
                ],
            )
        except Exception as exc:  # SDK / network / auth errors
            raise AIError(f"OpenAI request failed: {exc}") from exc

        content = resp.choices[0].message.content or ""
        return self._loads(content)
