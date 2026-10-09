# Horizon Properties — Real Estate Website

Premium real estate website built with Next.js 14 (App Router), TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS with custom design tokens (navy, champagne, parchment)
- **Animations:** Framer Motion (scroll reveals, carousel, gallery transitions)
- **Fonts:** Plus Jakarta Sans (via next/font/google)

## Running in the Sandbox
```bash
docker compose -f docker-compose.base44.yml up -d --build
```
The dev server runs on port 3000 with live reload. Dependencies install on container startup via `npm install`.

## Project Structure
- `app/` — Next.js App Router pages (homepage, properties listing, property detail)
- `components/` — Reusable UI and section components
- `data/` — Static property, service, and team data (structured for future DB connection)
- `lib/` — Utility functions and hooks (favorites via localStorage)

## Key Design Decisions
- **No external runtime dependencies** beyond Next.js/React/Framer Motion — keeps the bundle light.
- **Images** use Unsplash CDN URLs loaded via plain `<img>` tags with `loading="lazy"`.
- **Property data** is in `data/properties.ts` as a typed array — structured to be swapped for a database/API later.
- **Favorites** persist in `localStorage` (no backend required).
- **Carousel** uses native CSS scroll-snap + custom mouse drag, no library.
- **Header** is transparent over the hero on the homepage, solid on other pages and after scroll.

## Verification
- Homepage: `/` — hero, about, featured properties carousel, services, why choose us, team, CTA
- Properties listing: `/properties` — filterable/searchable grid
- Property detail: `/properties/[id]` — gallery, specs, amenities, agent card, schedule modal, similar properties
