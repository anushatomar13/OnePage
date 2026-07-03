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
- [x] **Phase 2** — Landing + resume upload
- [x] **Phase 3** — Backend: parsing + AI extraction
- [x] **Phase 4** — Processing experience
- [x] **Phase 5** — Portfolio sections (Hero, Education, Experience)
- [x] **Phase 6** — Portfolio sections (Projects, Skills, Achievements, Contact, Thank You)
- [x] **Phase 7** — Editor (inline text, theming, section reorder/hide)
- [x] **Phase 8** — Export (HTML / Next.js source / JSON), deploy & polish

## Export

From the preview, **Export** offers: a self-contained **HTML** file, a clean
**Next.js 15** source project (`.zip`), and the structured **resume JSON** — plus
a one-click path to deploy on Vercel.
