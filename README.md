# nakul-portfolio

Personal site for Nakul Iyer. Next.js App Router, TypeScript, Tailwind CSS v4.

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build
npm run start   # serve the production build
npm run lint    # eslint
```

## Structure

```
src/
├── app/                     # routes (App Router)
│   ├── layout.tsx           # shell: font, nav, footer, metadata defaults
│   ├── page.tsx             # /            home
│   ├── experience/          # /experience  roles, full bullets
│   ├── projects/            # /projects    cards
│   │   └── [slug]/          # /projects/:slug  detail, statically generated
│   ├── about/               # /about       education, skills, contact
│   ├── not-found.tsx
│   └── globals.css          # palette tokens + base styles
├── components/              # presentational, no data of their own
└── content/                 # the only place site content lives
    ├── profile.ts
    ├── experience.ts
    ├── projects.ts
    ├── education.ts
    └── skills.ts
```

**Content lives in `src/content`, never in components or pages.** Editing the
site means editing a typed object there. Adding a project to `projects.ts` gives
it a card and its own statically generated `/projects/[slug]` page with no other
changes.

## Design constraints

Carried over from the previous build; keep them when adding UI.

- One typeface (Outfit, self-hosted via `next/font`). No second family.
- Palette tokens in `globals.css` are fixed: cream, cocoa, apricot, and the
  three unused accents. Use them, don't add hex values in components.
- Transitions 150–200ms, colour and opacity only. No transform hovers.
- Border radius 6–8px. Shadows subtle or absent.
- Spacing on the 4/8/12/16/24/32 scale (Tailwind's default steps).

## Resume

`public/Iyer_Nakul.pdf` is linked from the home page, the About page, and the
footer. To update it, replace the file in place — the filename has no date in
it so no links need to change.

## Deploy

Deploys to Vercel as-is. Nothing in the app needs a server, so it can also be
exported as static files: uncomment `output: "export"` in `next.config.ts` and
`npm run build` writes `./out`.
