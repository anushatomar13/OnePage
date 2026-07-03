# onepage

**Turn your resume into a stunning portfolio in seconds — handcrafted, never templated.**

Upload a resume (PDF / DOCX) and onepage generates an award-winning, single-page
personal portfolio website. Dark by design, premium by default.

## Stack

| Layer | Tech |
| --- | --- |
| Frontend | Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · shadcn/ui · Framer Motion · GSAP · Zustand · TanStack Query · React Hook Form |
| Backend | FastAPI · Python · PyMuPDF · python-docx · OpenAI / Gemini |
| Deploy | Vercel (frontend) · Railway (backend) |

## Structure

```
onepage/
├── frontend/     # Next.js 15 app (Vercel)
└── backend/      # FastAPI service (Railway) — added in Phase 3
```

## Getting started (frontend)

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

## Design system

Dark-mode-only, AMOLED (`#050505`) foundation with a restrained iridescent
accent (violet → blue → cyan), fluid editorial type scale, glassmorphism
surfaces, a faint dot-grid, film-grain overlay, and slow-drifting aurora glows.
Tokens live in [`frontend/app/globals.css`](frontend/app/globals.css).

## Roadmap

- [x] **Phase 1** — Foundation & design system
- [ ] **Phase 2** — Landing + resume upload
- [ ] **Phase 3** — Backend: parsing + AI extraction
- [ ] **Phase 4** — Processing experience
- [ ] **Phase 5** — Portfolio sections (Hero, Education, Experience)
- [ ] **Phase 6** — Portfolio sections (Projects, Skills, Achievements, Contact, Thank You)
- [ ] **Phase 7** — Editor
- [ ] **Phase 8** — Export, deploy & polish
