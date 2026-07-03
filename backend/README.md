# onepage — backend

FastAPI service that turns an uploaded resume (PDF/DOCX) into a structured,
AI-enhanced `Portfolio` JSON consumed by the Next.js frontend.

## Pipeline

```
upload → parse text (PyMuPDF / python-docx) → AI extract + enhance → finalize → Portfolio
                                                     └── falls back to heuristic parser if no key
```

## Run locally

```bash
cd backend
python3 -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env          # add an OpenAI or Gemini key (optional)
uvicorn app.main:app --reload --port 8000
```

- Interactive docs: http://localhost:8000/docs
- Health: `GET /api/health`
- Generate: `POST /api/generate` (multipart form field `file`)

## AI providers

Set `OPENAI_API_KEY` **or** `GEMINI_API_KEY` in `.env`. `AI_PROVIDER=auto` (default)
picks whichever key is present. With no key, the service still works via a heuristic
parser (`source: "heuristic"` in the response) — lower quality, but fully functional
for local development.

## Deploy (Railway)

Start command:

```
uvicorn app.main:app --host 0.0.0.0 --port $PORT
```

Set `ALLOWED_ORIGINS` to your deployed frontend URL and add your AI key.
