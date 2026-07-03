from functools import lru_cache
from typing import Literal

from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Runtime configuration, loaded from environment / .env."""

    model_config = SettingsConfigDict(env_file=".env", extra="ignore")

    ai_provider: Literal["auto", "openai", "gemini", "none"] = "auto"

    openai_api_key: str = ""
    openai_model: str = "gpt-4o-mini"

    gemini_api_key: str = ""
    gemini_model: str = "gemini-2.0-flash"

    allowed_origins: str = "http://localhost:3000"

    max_upload_bytes: int = 10 * 1024 * 1024  # 10 MB

    @property
    def origins(self) -> list[str]:
        return [o.strip() for o in self.allowed_origins.split(",") if o.strip()]

    def resolved_provider(self) -> Literal["openai", "gemini", "none"]:
        """Resolve 'auto' to a concrete provider based on available keys."""
        if self.ai_provider == "openai":
            return "openai"
        if self.ai_provider == "gemini":
            return "gemini"
        if self.ai_provider == "none":
            return "none"
        # auto — Gemini is the primary provider; OpenAI is the secondary.
        if self.gemini_api_key:
            return "gemini"
        if self.openai_api_key:
            return "openai"
        return "none"


@lru_cache
def get_settings() -> Settings:
    return Settings()
