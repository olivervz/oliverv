# oliverv.xyz

Personal portfolio, rebuilt with [Astro](https://astro.build). Replaces the old Create React App version — same URL, same Firebase hosting, much less code.

Three pages: a minimalist landing page (`/`), a Work page with your projects and résumé (`/work`), and a Photos page — a filterable, sortable photo log (`/photos`). Every page shares the same design system and a working light/dark mode toggle.

## Before you start editing

A few things in the code are placeholders — search for `TODO`:

- `src/components/Hero.astro` — your real email address and LinkedIn URL.
- `src/data/projects.ts` — your project list. Add, remove, or edit entries here; no component changes needed.
- `src/data/photos.csv` — starts out empty (header row only). Add real photos using `npm run tag-photos` (see below) rather than editing the CSV by hand.

## Adding real photos

```bash
mkdir incoming-photos        # first time only
# drop a batch of image files in there, then:
npm run tag-photos
```

Built around a whole roll at a time, in two passes:

1. **Camera / film / date, once** — asked up front for the whole batch, since a roll is usually all the same camera and film shot in the same month. (If one photo genuinely differs, fix its row in `photos.csv` by hand afterward.) Type a new camera/film to add it — it's remembered for next time, right alongside whatever you've already used, via the same click-or-type dropdown described below.
2. **Review** — the input folder opens once in Explorer as a thumbnail reference (switch its view to Large icons to browse), then for each photo in order you choose Keep / Discard / View full-size / **Back** / Stop reviewing. "View full-size" opens just that one photo on demand — it's opt-in rather than automatic, since popping a viewer window for every single photo steals focus from the terminal each time. Back steps to the previous photo so you can change your mind — e.g. you kept the first of three near-identical shots, then the third one turns out to be the better one: Back twice, switch the first to Discard, move forward again. Nothing is written to disk during this pass, so quitting (Ctrl+C) here loses nothing. (Files starting with "." are skipped automatically — this includes macOS `._*` AppleDouble sidecar files, which otherwise show up as extra "photos" when a folder was copied from a Mac.)
3. **Tag the keepers** — for just the photos you kept, asks location + notes, with a click-or-type dropdown of every location you've used before. Typing "nyc" will suggest "New York, NY" if that's already in there, so you don't end up with near-duplicate filter values from shorthand or inconsistent capitalization (a few common abbreviations are recognized explicitly; otherwise it's a fuzzy match — click an existing one or keep typing to add new).

Each tagged photo is resized and recompressed (originals are left alone — never overwritten, never moved) down to 2400px on the long edge at JPEG quality 85 before landing in `public/photos/`, and appended as a row to `src/data/photos.csv`, which `src/data/photos.ts` reads at build/dev time — so `npm run dev` picks up new photos immediately, no other changes needed. That's still sharper than a browser will ever render it, so there's no visible quality loss, but it cuts a typical 6-9MB scanner export down to well under 1MB — the difference between a repo that stays small and one that balloons every time you tag a roll. `incoming-photos/` is gitignored; only the copies in `public/photos/` get committed.

## Fixing a photo's crop/tilt later

If you tagged a photo before straightening or recropping it, `npm run review-photos` opens a local, private thumbnail grid (`http://localhost:4848` — not part of the built site, not reachable by anyone else, only runs while the command is running):

```bash
npm run review-photos
```

Click a photo's flag icon to mark it "needs fixing" for later — that's just a hidden `flagged` column in `photos.csv`, never shown on the site. Drag a corrected image file onto **any** photo (flagged or not) to swap it in immediately: it goes through the same resize/recompress step as `tag-photos.mjs` and overwrites the file in `public/photos/` under its existing name, so every other column in that row (date, batch, title, camera, film, location, notes) is left exactly as-is — only the pixels change. A successful replace clears the flag automatically.

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
scripts/
  tag-photos.mjs            # npm run tag-photos — see "Adding real photos" above
  review-photos.mjs         # npm run review-photos — see "Fixing a photo's crop/tilt later" above
  review-photos.html        # the page review-photos.mjs serves (local only, not part of the built site)
src/
  data/
    projects.ts           # project list — edit to add/remove projects
    photos.csv              # photo log data — edit via `npm run tag-photos`, not by hand
    photos.ts                # reads photos.csv at build/dev time into the Photo[] used by photos.astro
  lib/
    csv.ts                  # tiny CSV parse/stringify shared by photos.ts (tag-photos.mjs keeps its own copy — see the comment at the top of that file)
  layouts/
    Layout.astro           # <head>, fonts, no-flash theme-init script, mounts ThemeToggle
  components/
    Hero.astro              # landing page content (/)
    SiteNav.astro            # small top nav used on /work and /photos
    ThemeToggle.astro        # the moon/sun dark-mode button, fixed top-right on every page
    Projects.astro, ProjectCard.astro
    icons/                   # inline SVG icon components
  styles/
    global.css               # theme CSS variables (light + dark), fonts, background grid, shared classes
  pages/
    index.astro               # Hero only — the landing page
    work.astro                 # résumé download + Projects
    photos.astro                # filters, sort toggle, year-grouped grid, lightbox
public/
  documents/                 # Resume.pdf, Pneumonia.pdf (linked from the projects list / Work page)
  photos/                     # real photo files, populated by `npm run tag-photos`
```

## Notes

- Colors and fonts live as CSS variables at the top of `src/styles/global.css` (`--bg`, `--ink`, `--accent`, plus dark-mode overrides under `[data-theme="dark"]`) if you want to adjust the palette later. Figtree is the font throughout.
- Dark mode: `ThemeToggle.astro` flips a `data-theme="dark"` attribute on `<html>` and remembers the choice in `localStorage`; a small blocking script in `Layout.astro`'s `<head>` applies that choice (or the OS preference, if you've never toggled it) before first paint, so there's no light-then-dark flash on load.
- The Photos page derives its Camera/Film/Location filter options from whatever's actually in `photos.csv` — a new camera tagged via `npm run tag-photos` shows up as a filter automatically. Sorting is oldest-first by default with year dividers; the sort toggle switches to newest-first.
- Entries with a real `image` render an actual photo; a row with only a `color` value (no image) falls back to a flat-color tile instead — not used by `npm run tag-photos`, but there if you ever want to hand-add a placeholder row.
