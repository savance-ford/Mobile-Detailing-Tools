# DetailerStack (Next.js App Router)

This is a **Next.js (App Router) + React + Tailwind** project for an affiliate-style directory of software/tools for **mobile car detailing**.

It was originally generated with Base44. This version is rebuilt to run **without Base44** and without any proxy/env requirements.

## Quick start

```bash
npm install
npm run dev
```

Next.js will print a local URL such as:

```
http://localhost:3000
```

Open that URL in your browser.

## Routes

Clean, SEO-friendly routes (App Router):

- `/` — home
- `/tools` — all tools
- `/tools/[slug]` — tool review
- `/categories` — categories
- `/categories/[slug]` — category detail
- `/guides` — guides hub
- `/guides/[slug]` — guide detail
- `/best` — best-for hub
- `/best/[feature]` — best-for detail
- `/vs` — comparison hub
- `/vs/[slugs]` — comparison detail (e.g. `jobber-vs-housecall-pro`)
- `/affiliate-disclosure`, `/privacy`, `/terms` — legal

## Data

All content currently comes from local mock data:

- `src/data/mockData.js`

If you want to connect a real backend later, replace the in-memory client in:

- `src/api/base44Client.js`

The pages expect a simple API shape:

- `base44.entities.Tool.list(sortField, limit)`
- `base44.entities.Tool.filter(criteria, sortField, limit)`

## Notes

- Routing is handled by **Next.js App Router** (no React Router).
- The UI uses **shadcn/ui** components and Tailwind.
- The app still uses **@tanstack/react-query** for data fetching/caching (even though data is local right now).
