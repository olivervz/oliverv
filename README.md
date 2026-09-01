# oliverv.xyz

Personal portfolio, rebuilt with [Astro](https://astro.build). Replaces the old Create React App version — same URL, same Firebase hosting, much less code.

## Before you start editing

Two things in the code are placeholders — search for `TODO` / `[...]`:

- `src/components/Hero.astro` — real email address and LinkedIn URL, plus the bio line under your name.
- `src/data/projects.ts` — this is your project list. Add, remove, or edit entries here; no component changes needed.

## Local setup

```bash
npm install
npm run dev
```

Opens a local preview at `http://localhost:4321`.

## Build

```bash
npm run build
```

Outputs static files to `dist/`.

## Deploy (same Firebase site you already have)

If you haven't linked this folder to your Firebase project yet:

```bash
npm install -g firebase-tools   # if not already installed
firebase login
firebase use --add              # pick your existing oliverv.xyz project
```

Then, any time you want to publish:

```bash
npm run deploy
```

(This runs `astro build` and `firebase deploy --only hosting` — same domain, no DNS changes.)

## Structure

```
src/
  data/projects.ts       # project list — edit this to add/remove projects
  layouts/Layout.astro   # <head>, fonts, global wrapper
  components/            # Hero, Projects section, ProjectCard, icons
  styles/global.css      # colors, fonts, shared classes (buttons, section marks)
  pages/index.astro      # assembles the page
public/
  documents/             # Resume.pdf, Pneumonia.pdf (linked from the projects list)
```

## Notes

- Colors, fonts, and the background texture live as CSS variables at the top of `src/styles/global.css` (`--bg`, `--ink`, `--accent`) if you want to adjust the palette later.
- A "photos" page (Polaroid-style photo log with camera/lens/film metadata) was sketched as a design concept but intentionally left out of this build — see the design mockup for the idea when you're ready to build it.
