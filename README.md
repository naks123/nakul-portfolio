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
│   └── globals.css          # design tokens, base styles, motion
├── components/              # presentational, no data of their own
├── content/                 # the only place site content lives
│   ├── profile.ts
│   ├── experience.ts
│   ├── projects.ts
│   ├── education.ts
│   ├── skills.ts
│   └── navigation.ts        # header + footer links
└── lib/github.ts            # data for the GitHub hover card (revalidates hourly)
```

**Content lives in `src/content`, never in components or pages.** Editing the
site means editing a typed object there. Adding a project to `projects.ts` gives
it a card and its own statically generated `/projects/[slug]` page with no other
changes.

## Design system

Dark-first, restrained. Every visual value is a token at the top of
`src/app/globals.css`; change it there and every component follows. Don't put
hex values or one-off sizes in components.

- **Color.** True black background; text in white at 100 / 70 / 50%
  (`ink`, `ink-muted`, `ink-subtle`; all pass AA on black). Accents are yellow,
  red, and blue, used for motion and small highlights, never large fills.
  Only yellow is safe for text and focus rings; red and blue are decoration only.
- **Type.** One family. Fluid scale: `text-display`, `text-h2`, `text-h3`,
  `text-lead`, `text-body`, `text-label`.
- **Shape.** Cards use `rounded-card` (24px) with a 1px `border-line`; buttons
  are `Pill` (fully rounded).
- **Motion.** Scroll reveals (`data-reveal`, or `data-reveal="words"` for
  headings), the hero ring, and the stack strip. The ring is one WebGL shader
  in `src/lib/heroRing.ts` (no 3D library), colored from the accent tokens. It
  pauses offscreen, caps at 30fps on phones, draws a single still frame under
  reduced motion, and falls back to the CSS blobs (`HeroBlobs`) without WebGL. All of it is scoped under
  `.motion-ok`, which is only set when the visitor hasn't asked for reduced
  motion, so reduced-motion and no-JavaScript visitors get a static page with
  nothing hidden. The strip has a pause button.

### Changing the font

One place: the `next/font/google` import and the call in `src/app/layout.tsx`.
Keep `variable: "--font-brand"` and nothing else needs to change. For example,
to try Manrope:

```ts
import { Manrope } from "next/font/google";
const brandFont = Manrope({ subsets: ["latin"], variable: "--font-brand", display: "swap" });
```

## Resume

`public/Iyer_Nakul.pdf` is linked from the home page, the About page, and the
footer. To update it, replace the file in place — the filename has no date in
it so no links need to change.

## Deploy

Deploys to Vercel as-is. Nothing in the app needs a server, so it can also be
exported as static files: uncomment `output: "export"` in `next.config.ts` and
`npm run build` writes `./out`.
