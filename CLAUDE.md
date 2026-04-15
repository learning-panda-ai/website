# Project: <Your App Name>

## Stack
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Prisma + PostgreSQL (or your DB)
- next-auth for authentication

## Commands
- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run lint` — run ESLint
- `npm run typecheck` — run tsc --noEmit
- `npm test` — run Jest tests

## Code Style
- Use ES modules (import/export), never CommonJS (require)
- Always use TypeScript — no `any` types
- Use server components by default; add `"use client"` only when needed
- Co-locate components with their styles and tests
- Prefer named exports over default exports

## File Structure
- `app/` — App Router pages and layouts
- `components/` — Shared UI components
- `lib/` — Utilities and server-side helpers
- `types/` — Shared TypeScript types

## Important Rules
- NEVER commit secrets or API keys
- ALWAYS run typecheck after making multiple file changes
- Do NOT modify `prisma/migrations/` manually
- Use `server actions` for form mutations, not API routes

## Workflow
- Run single tests, not the full suite, for performance
- When fixing bugs, explain what caused it before changing code