from __future__ import annotations

from fastapi import APIRouter, File, HTTPException, UploadFile

from app.config import get_settings
from app.models import GenerateResponse
from app.services.extraction import generate_portfolio
from app.services.parsing import UnsupportedFileError, extract_text

router = APIRouter(prefix="/api")

ALLOWED_EXTENSIONS = (".pdf", ".docx")


@router.get("/health")
def health() -> dict[str, str]:
    settings = get_settings()
    return {"status": "ok", "provider": settings.resolved_provider()}


@router.post("/generate", response_model=GenerateResponse)
async def generate(file: UploadFile = File(...)) -> GenerateResponse:
    settings = get_settings()

    filename = file.filename or ""
    if not filename.lower().endswith(ALLOWED_EXTENSIONS):
        raise HTTPException(status_code=400, detail="Only PDF and DOCX files are supported.")

    data = await file.read()
    if not data:
        raise HTTPException(status_code=400, detail="That file looks empty.")
    if len(data) > settings.max_upload_bytes:
        raise HTTPException(status_code=413, detail="File exceeds the 10 MB limit.")

    try:
        text = extract_text(filename, data)
    except UnsupportedFileError as exc:
        raise HTTPException(status_code=400, detail=str(exc)) from exc
    except Exception as exc:  # corrupt / unreadable file
        raise HTTPException(
            status_code=422, detail="Could not read that file. Is it a valid resume?"
        ) from exc

    if len(text.strip()) < 40:
        raise HTTPException(
            status_code=422,
            detail="Not enough text found. Scanned or image-only resumes aren't supported yet.",
        )

    portfolio, source = generate_portfolio(text)
    return GenerateResponse(portfolio=portfolio, source=source)  # type: ignore[arg-type]
