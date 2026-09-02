#!/usr/bin/env node
// Interactive photo-tagging CLI.
//
// Usage:
//   npm run tag-photos [-- <folder-of-images>]
//   (defaults to ./incoming-photos if no folder is given)
//
// Built around a whole roll at a time: everything in the folder usually
// shares one camera/film/month, so those are asked ONCE up front. Then it
// runs in two passes:
//
//   1. Review — opens the input folder once in Explorer as a thumbnail
//      reference (switch its view to Large icons), then asks Keep /
//      Discard / View full-size / Back / Stop reviewing for each photo in
//      order. "View full-size" opens just that one photo on demand — it's
//      opt-in rather than automatic, since popping a viewer window for
//      every single photo steals focus from the terminal each time. "Back"
//      steps back to the previous photo so you can change your mind —
//      handy when photo #3 of a group shot turns out to be the one you
//      actually want and you need to un-keep #1.
//   2. Tag — for just the photos you kept, asks location + notes (with a
//      fuzzy-matched, click-or-type dropdown of locations you've used
//      before, so "nyc"/"NYC"/"New York, NY" collapse to one canonical
//      value instead of forking your filter list).
//
// Kept photos are resized/recompressed (never just copied — see MAX_LONG_EDGE
// / JPEG_QUALITY below) into public/photos/ as .jpg, and appended to
// src/data/photos.csv, which src/data/photos.ts reads at build/dev time —
// the photos page picks new entries up immediately. Originals in the input
// folder are left untouched, and nothing is written until a photo is
// actually tagged in pass 2, so quitting mid-review loses nothing.
//
// Files starting with "." are skipped when scanning the folder — this
// includes "._*" AppleDouble sidecar files, which macOS silently creates
// alongside every real file when copying to a non-Mac drive (a common
// source of a folder appearing to have twice as many images as it should).

import fs from "node:fs";
import path from "node:path";
import { exec } from "node:child_process";
import { fileURLToPath } from "node:url";
import prompts from "prompts";
import sharp from "sharp";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const CSV_PATH = path.join(ROOT, "src/data/photos.csv");
const PHOTOS_DIR = path.join(ROOT, "public/photos");
const HEADER = ["id", "date", "batch", "camera", "film", "location", "notes", "image", "color"];
const IMAGE_EXT = new Set([
  ".jpg", ".jpeg", ".png", ".heic", ".heif", ".tif", ".tiff", ".webp", ".gif",
]);

// full film scans out of a scanner are typically 5-9MB each at ~3600px on
// the long edge — way more resolution and bit-depth than a browser will
// ever actually display. Every kept photo gets resized/recompressed to
// this on its way into public/photos/, which cuts file size by ~85-90%
// with no visible quality loss on screen (2400px is still sharper than any
// browser will render it at, even on a retina display).
const MAX_LONG_EDGE = 2400;
const JPEG_QUALITY = 85;

const PROMPT_OPTS = {
  onCancel: () => {
    console.log("\nCancelled — nothing further was written.");
    process.exit(1);
  },
};

// ---------- tiny CSV parse/stringify (kept in sync with src/lib/csv.ts by
// hand — this script runs under plain Node, not Astro's Vite pipeline, so
// it can't import the .ts version directly) ----------

function parseCsv(text) {
  const rows = [];
  let row = [];
  let field = "";
  let inQuotes = false;
  const s = text.replace(/\r\n/g, "\n");
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (inQuotes) {
      if (c === '"') {
        if (s[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ",") {
      row.push(field);
      field = "";
    } else if (c === "\n") {
      row.push(field);
      rows.push(row);
      row = [];
      field = "";
    } else {
      field += c;
    }
  }
  if (field.length > 0 || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows;
}

function stringifyCsvField(value) {
  const s = String(value ?? "");
  if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
  return s;
}

function stringifyCsvRow(fields) {
  return fields.map(stringifyCsvField).join(",");
}

// ---------- fuzzy matching ----------

function normalize(s) {
  return s.trim().toLowerCase().replace(/\s+/g, " ");
}

function tokenize(s) {
  return normalize(s).replace(/[^a-z0-9\s]/g, " ").split(/\s+/).filter(Boolean);
}

function levenshtein(a, b) {
  const m = a.length;
  const n = b.length;
  if (m === 0) return n;
  if (n === 0) return m;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      dp[i][j] =
        a[i - 1] === b[j - 1]
          ? dp[i - 1][j - 1]
          : 1 + Math.min(dp[i - 1][j - 1], dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
}

function scoreRaw(candidateNorm, queryNorm) {
  if (!queryNorm) return 1; // neutral: show everything until they type
  if (candidateNorm === queryNorm) return 100;
  if (candidateNorm.startsWith(queryNorm)) return 90;
  if (candidateNorm.includes(queryNorm)) return 80;
  if (queryNorm.includes(candidateNorm)) return 75;

  const tq = tokenize(queryNorm);
  const tc = tokenize(candidateNorm);
  const shared = tq.filter((t) => tc.includes(t)).length;
  if (shared > 0) {
    const ratio = shared / Math.max(tq.length, tc.length);
    return 50 + 20 * ratio;
  }

  const dist = levenshtein(queryNorm, candidateNorm);
  const maxLen = Math.max(queryNorm.length, candidateNorm.length) || 1;
  const similarity = 1 - dist / maxLen;
  if (similarity > 0.55) return 30 + 20 * similarity;
  return 0;
}

// A few common abbreviations worth recognizing explicitly — generic string
// similarity alone won't connect "NYC" to "New York, NY".
const ALIASES = {
  nyc: "new york",
  la: "los angeles",
  sf: "san francisco",
  dc: "washington",
};

function score(candidate, query) {
  const nq = normalize(query);
  const nc = normalize(candidate);
  const base = scoreRaw(nc, nq);
  const expanded = ALIASES[nq] ? scoreRaw(nc, normalize(ALIASES[nq])) : 0;
  return Math.max(base, expanded);
}

function makeSuggest(getChoices) {
  return async (input) => {
    const choices = getChoices();
    const nInput = normalize(input);
    const ranked = choices
      .map((c) => ({ c, s: score(c.title, input) }))
      .filter((x) => x.s > 0)
      .sort((a, b) => b.s - a.s || a.c.title.localeCompare(b.c.title))
      .map((x) => x.c);

    const hasExact = choices.some((c) => normalize(c.title) === nInput);
    if (input.trim() && !hasExact) {
      ranked.push({ title: `+ Add new: "${input.trim()}"`, value: input.trim() });
    }
    return ranked;
  };
}

// ---------- CSV data access ----------

function readPhotosCsv() {
  if (!fs.existsSync(CSV_PATH)) {
    return { header: HEADER, rows: [] };
  }
  const text = fs.readFileSync(CSV_PATH, "utf-8");
  const parsed = parseCsv(text).filter((r) => r.length > 1 || (r[0] ?? "").trim() !== "");
  const [header, ...rows] = parsed;
  return { header: header ?? HEADER, rows };
}

// every photo tagged in one run of this script gets the same "batch"
// number, one higher than whatever's already in the CSV. It's never shown
// anywhere — it exists purely so the photos page can keep a whole roll
// contiguous in the grid even when two different rolls share the same
// YYYY-MM date and would otherwise be indistinguishable once sorted.
function nextBatchNumber(header, rows) {
  const idx = header.indexOf("batch");
  if (idx === -1) return 1;
  let max = 0;
  for (const row of rows) {
    const n = parseInt(row[idx], 10);
    if (!Number.isNaN(n) && n > max) max = n;
  }
  return max + 1;
}

function distinctColumn(header, rows, name) {
  const idx = header.indexOf(name);
  if (idx === -1) return [];
  const seen = new Map(); // normalized -> first-seen display form
  for (const row of rows) {
    const v = (row[idx] ?? "").trim();
    if (!v) continue;
    const n = normalize(v);
    if (!seen.has(n)) seen.set(n, v);
  }
  return [...seen.values()].sort((a, b) => a.localeCompare(b));
}

function appendRow(row) {
  let text = fs.existsSync(CSV_PATH) ? fs.readFileSync(CSV_PATH, "utf-8") : HEADER.join(",") + "\n";
  if (text.length > 0 && !text.endsWith("\n")) text += "\n";
  text += stringifyCsvRow(row) + "\n";
  fs.writeFileSync(CSV_PATH, text, "utf-8");
}

// ---------- filename / id handling ----------

function slugify(base) {
  return base
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "photo";
}

function uniqueId(base, existingIds) {
  let candidate = slugify(base);
  let n = 2;
  while (existingIds.has(candidate)) {
    candidate = `${slugify(base)}-${n}`;
    n++;
  }
  existingIds.add(candidate);
  return candidate;
}

// ---------- open a photo in the OS default viewer (fire-and-forget — we
// don't wait for it, so the next prompt shows up immediately) ----------

function openImage(filePath) {
  const cmd =
    process.platform === "win32"
      ? `start "" "${filePath}"`
      : process.platform === "darwin"
      ? `open "${filePath}"`
      : `xdg-open "${filePath}"`;
  exec(cmd, () => {});
}

// ---------- main ----------

async function main() {
  const inputDir = path.resolve(ROOT, process.argv[2] || "incoming-photos");

  if (!fs.existsSync(inputDir) || !fs.statSync(inputDir).isDirectory()) {
    console.error(`No folder at ${inputDir}.`);
    console.error(`Create it and drop images in, or pass a path: npm run tag-photos -- path/to/folder`);
    process.exit(1);
  }

  const files = fs
    .readdirSync(inputDir)
    .filter((f) => !f.startsWith(".") && IMAGE_EXT.has(path.extname(f).toLowerCase()))
    .sort();

  if (files.length === 0) {
    console.log(`No images found in ${inputDir}.`);
    return;
  }

  fs.mkdirSync(PHOTOS_DIR, { recursive: true });

  const { header, rows } = readPhotosCsv();
  const existingIds = new Set(rows.map((r) => r[header.indexOf("id")]).filter(Boolean));
  const batchNumber = nextBatchNumber(header, rows);

  const cameraChoices = distinctColumn(header, rows, "camera").map((v) => ({ title: v, value: v }));
  const filmChoices = distinctColumn(header, rows, "film").map((v) => ({ title: v, value: v }));
  const locationChoices = distinctColumn(header, rows, "location").map((v) => ({ title: v, value: v }));

  function rememberChoice(list, value) {
    if (!list.some((c) => normalize(c.title) === normalize(value))) {
      list.push({ title: value, value });
    }
  }

  console.log(`Found ${files.length} image(s) in ${inputDir}.\n`);

  // ---- once per batch: camera / film / date, since a whole roll is
  // usually all the same. Fix up an individual photo afterward by editing
  // its row in src/data/photos.csv directly if one genuinely differs. ----
  const batch = await prompts(
    [
      {
        type: "autocomplete",
        name: "camera",
        message: `Camera (for all ${files.length} photos)`,
        choices: cameraChoices,
        suggest: makeSuggest(() => cameraChoices),
      },
      {
        type: "autocomplete",
        name: "film",
        message: "Film",
        choices: filmChoices,
        suggest: makeSuggest(() => filmChoices),
      },
      {
        type: "text",
        name: "date",
        message: "Date (YYYY or YYYY-MM)",
        validate: (v) => (/^\d{4}(-\d{2})?$/.test(v.trim()) ? true : "Use YYYY or YYYY-MM"),
      },
    ],
    PROMPT_OPTS
  );
  if (batch.camera === undefined || batch.film === undefined || batch.date === undefined) return;
  rememberChoice(cameraChoices, batch.camera);
  rememberChoice(filmChoices, batch.film);

  // ---- pass 1: review — Keep / Discard / Back, in any order you like.
  // Nothing is written to disk in this pass, so quitting (Ctrl+C) at any
  // point here loses nothing.
  //
  // The folder opens ONCE in Explorer as a thumbnail reference (switch its
  // view to Large/Extra large icons) rather than auto-popping a viewer for
  // every single photo — that used to steal window focus from the
  // terminal on every photo, which was more annoying than helpful. Pick
  // "View full-size" from the menu on any photo you want to actually open.
  console.log(`\nReviewing ${files.length} photo(s).`);
  console.log(`Opening ${inputDir} in Explorer for reference — switch its view to Large icons`);
  console.log(`to browse thumbnails. Pick "View full-size" below to open any one of them.\n`);
  openImage(inputDir);

  const decisions = new Array(files.length).fill(null); // null | true (keep) | false (discard)
  let i = 0;
  while (i < files.length) {
    const file = files[i];
    const current = decisions[i];
    const status = current === true ? " (currently: Keep)" : current === false ? " (currently: Discard)" : "";

    const { action } = await prompts(
      {
        type: "select",
        name: "action",
        message: `[${i + 1}/${files.length}] ${file}${status}`,
        choices: [
          { title: "Keep", value: "keep" },
          { title: "Discard", value: "discard" },
          { title: "View full-size", value: "view" },
          ...(i > 0 ? [{ title: "← Back (revisit the previous photo)", value: "back" }] : []),
          { title: "Stop reviewing → tag what I've kept so far", value: "stop" },
        ],
        // default to Discard (index 1) rather than Keep — safer to have
        // to opt in to keeping a photo than to opt out of discarding one
        initial: 1,
      },
      PROMPT_OPTS
    );

    if (action === undefined || action === "stop") break;
    if (action === "view") {
      openImage(path.join(inputDir, file));
      continue; // re-show the same photo's menu
    }
    if (action === "back") {
      i--;
      continue;
    }
    decisions[i] = action === "keep";
    i++;
  }

  const kept = files.filter((_, idx) => decisions[idx] === true);
  console.log(`\nKept ${kept.length} of ${files.length}.`);
  if (kept.length === 0) {
    console.log("Nothing to tag — done.");
    return;
  }

  // ---- pass 2: tag the keepers — just location + notes, since camera /
  // film / date are already set for the whole batch. The Explorer window
  // from pass 1 is still open for reference. ----
  console.log(`\nTagging ${kept.length} photo(s).\n`);

  let tagged = 0;
  for (const file of kept) {
    const answers = await prompts(
      [
        {
          type: "autocomplete",
          name: "location",
          message: `${file} — Location`,
          choices: locationChoices,
          suggest: makeSuggest(() => locationChoices),
        },
        {
          type: "text",
          name: "notes",
          message: "Notes (optional)",
          initial: "",
        },
      ],
      PROMPT_OPTS
    );

    if (answers.location === undefined) break; // cancelled mid-form

    rememberChoice(locationChoices, answers.location);

    const id = uniqueId(path.basename(file, path.extname(file)), existingIds);
    const destName = `${id}.jpg`; // always .jpg out — see MAX_LONG_EDGE comment above
    await sharp(path.join(inputDir, file))
      .rotate() // apply EXIF orientation before resizing, then this drops the tag
      .resize({
        width: MAX_LONG_EDGE,
        height: MAX_LONG_EDGE,
        fit: "inside",
        withoutEnlargement: true,
      })
      .jpeg({ quality: JPEG_QUALITY, progressive: true })
      .toFile(path.join(PHOTOS_DIR, destName));

    appendRow([
      id,
      batch.date.trim(),
      batchNumber,
      batch.camera,
      batch.film,
      answers.location,
      answers.notes ?? "",
      `/photos/${destName}`,
      "",
    ]);

    tagged++;
    console.log(`  ✓ saved as ${id}\n`);
  }

  console.log(`\nDone — ${tagged} photo(s) added.`);
  if (tagged > 0) {
    console.log(`Run \`npm run dev\` and check /photos, then commit + deploy when you're happy.`);
  }
}

main();
