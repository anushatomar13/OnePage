"""Provider-agnostic AI interface. Each adapter turns a prompt into parsed JSON."""

from __future__ import annotations

import abc
import json
from typing import Any


class AIError(RuntimeError):
    pass


class AIProvider(abc.ABC):
    """A minimal contract: given system + user prompts, return a JSON object."""

    name: str = "base"

    @abc.abstractmethod
    def complete_json(self, system: str, user: str) -> dict[str, Any]:
        """Return the model's response parsed as a JSON object."""

    @staticmethod
    def _loads(raw: str) -> dict[str, Any]:
        """Parse JSON, tolerating markdown code fences some models emit."""
        text = raw.strip()
        if text.startswith("```"):
            text = text.strip("`")
            # drop a leading language tag like "json\n"
            if "\n" in text:
                first, rest = text.split("\n", 1)
                if first.strip().lower() in {"json", ""}:
                    text = rest
        try:
            data = json.loads(text)
        except json.JSONDecodeError as exc:
            raise AIError(f"Model did not return valid JSON: {exc}") from exc
        if not isinstance(data, dict):
            raise AIError("Model JSON was not an object.")
        return data
