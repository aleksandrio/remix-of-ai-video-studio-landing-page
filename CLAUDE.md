# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Polish-language landing page and lesson platform for an AI video production course. Originally scaffolded with Lovable.dev. The site has a marketing landing page (`/`) and individual lesson pages (`/lekcja/:slug`) with survey modules and tool sections.

## Commands

- `npm run dev` — start dev server on port 8080
- `npm run build` — production build
- `npm run build:dev` — development build
- `npm run lint` — ESLint
- `npm run preview` — preview production build

## Architecture

**Stack:** Vite + React 18 + TypeScript + Tailwind CSS + shadcn/ui + Framer Motion

**Routing:** React Router v7 with lazy-loaded lesson pages in `src/App.tsx`. Routes:
- `/` — marketing landing page (Index)
- `/lekcja/2-metody-nauki` — dedicated lesson page (MetodyNaukiPage)
- `/lekcja/3-asystenci-ai` — dedicated lesson page (AsystenciAiPage)
- `/lekcja/:slug` — generic lesson page (LessonPage)
- `/admin` — admin panel

**Path alias:** `@` maps to `src/` (configured in both vite.config.ts and tsconfig.json).

**Backend:** Supabase for data persistence. Client initialized in `src/integrations/supabase/client.ts`, types in `src/integrations/supabase/types.ts`. Uses env vars `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY`. Supabase config and migrations live in `supabase/`.

**Lesson pages pattern:** Each lesson page (e.g., MetodyNaukiPage, AsystenciAiPage) has its own directory under `src/components/` with a consistent set of modules: StartSurvey, LiveStartResults, FeedbackSurvey, plus lesson-specific components (MethodCard, AssistantCard, etc.).

**Theming:** CSS custom properties in `src/index.css` with light/dark mode support via `.dark` class. Custom color tokens (accent-sage, accent-olive, accent-terracotta, accent-sand, accent-stone). Fonts: Outfit (headings) and DM Sans (body), loaded via `<link>` tags in `index.html`.

**UI components:** shadcn/ui with `default` style, no RSC, CSS variables enabled. Config in `components.json`. Reusable UI in `src/components/ui/`.
